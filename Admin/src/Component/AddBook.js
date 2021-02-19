import React from 'react';
import 'antd/dist/antd.css';
import Layout from '../Layout/Layout';
import { Form, Button, message, Input } from 'antd';
export default class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      author: '',
      year:'',
      url: '',
      stock : 0
    };
  }
  
  formRef = React.createRef();

  onReset =  () => {
    this.setState({name:''});
    this.setState({author:''});
    this.setState({year:''});
    this.setState({url:''});
    this.setState({stock:''});
    this.formRef.current.resetFields();
  };
  
  onChangeName = (e) => {
    this.setState({name:e.target.value})
  };

  onChangeAuthor = (e) => {
    this.setState({author:e.target.value})
  };

  onChangeYear = (e) => {
    this.setState({year:e.target.value})
  };

  onChangeUrl = (e) => {
    this.setState({url:e.target.value})
  };

  onChangeStock = (e) => {
    this.setState({stock:e.target.value})
  };

  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

  tailLayout = {
    wrapperCol: {
      offset: 5,
      span: 16,
    },
  };

  tailLayout1 = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  };

  insert = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name ,author : this.state.author, year:this.state.year,url:this.state.url,stock:this.state.stock})
    };
    await fetch('/Addbook', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          message.info('การเพิ่มหนังสือสำเร็จ'); 
          this.onReset()
        }
        else{
          message.info('ไม่สามารถเพิ่มหนังสือได้'); 
        }
      }) 
  }

  onClick = () => {
    if(this.state.name == '' || this.state.author == '' || this.state.year == '' || this.state.url == '' || this.state.stock == '')
    {
      message.info('กรุณากรอกข้อมูลให้ครบ');
    }
    else
    {
      if(this.state.year.length != 4)
      {
        message.info('กรุณาตรวจข้อมูล');
      }
      else
      {
          console.log(this.state.name);
          console.log(this.state.author);
          console.log(this.state.year);
          console.log(this.state.url);
          console.log(this.state.stock);
          this.insert()
      }
    }
  }

  render() {
    return (
      <Layout>
        <Form {...this.layout} name="basic" ref={this.formRef} style={{marginRight:'10%'}} >
          <Form.Item {...this.tailLayout1}>
            <label style={{ color: 'black',fontWeight:'bold'}}>Add Book</label>
          </Form.Item>
          
          <Form.Item label={<label style={{ color: 'black',fontWeight:'bold' }}>Name</label>} name="Name" rules={[{ required: true, message: 'Please input Name!' },]} >
            <Input id = 'input1' onChange={this.onChangeName}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'black',fontWeight:'bold' }}>Author</label>}  name="Author" rules={[{ required: true, message: 'Please input Author!' }]} >
            <Input id = 'input2' onChange={this.onChangeAuthor}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'black',fontWeight:'bold' }}>Year</label>}  name="Year" rules={[{ required: true, message: 'Please input Year!' }]} >
            <Input id = 'input3' type = 'number'  onChange={this.onChangeYear}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'black',fontWeight:'bold' }}>URL</label>}  name="URL" rules={[{ required: true, message: 'Please input URL!' }]} >
            <Input id = 'input4' onChange={this.onChangeUrl}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'black',fontWeight:'bold' }}>stock</label>}  name="stock" rules={[{ required: true, message: 'Please input stock!' }]} >
            <Input id = 'input5' type = 'number' onChange={this.onChangeStock}/>
          </Form.Item>

          <Form.Item {...this.tailLayout1}>
            <div>
              <Button onClick = {() => this.onClick()} style = {{ width: '10vh'}} type="primary" >
                ADD
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button style = {{ width: '10vh'}} type="primary" onClick={() => this.onReset()} >
                Reset
              </Button>
            </div>
          </Form.Item>

        </Form>
      </Layout>
      
    );
  }
}
