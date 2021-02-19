import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import './custom.css'
import Layout from '../Layout/Layout';
import store from "store";

export default class ChangePassword extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      pass: '',
      newpass: '',
      confirmpass: '',
    };
  }

  
  formRef = React.createRef();

   layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
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
  
  changepass = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user:store.get("token"),pass: this.state.pass ,newpass : this.state.newpass, confirmpass:this.state.confirmpass})
    };
    await fetch('/changepass', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
            message.info('เปลี่ยนรหัสผ่านสำเร็จ!!'); 
        }
        else
        {
            message.info('ไม่สามารถเปลี่ยนรหัสได้'); 
        }
      }) 
  };

  onClick =  () =>  {
    console.log(store.get("token"))
    if(this.state.newpass == this.state.confirmpass)
    {
        this.changepass();
    }
    else
    {
        message.info('กรุณาตรวจสอบข้อมูล'); 
    }
    //console.log(this.state.status);
  };

  onReset =  () => {
    this.setState({pass:''});
    this.setState({newpass:''});
    this.setState({confirmpass:''});
    this.formRef.current.resetFields();
  };

  onChangePass = (e) => {
    this.setState({pass:e.target.value})
  };

  onChangeNPass = (e) => {
    this.setState({newpass:e.target.value})
  };
  onChangeCPass = (e) => {
    this.setState({confirmpass:e.target.value})
  };

  render() {
    return (
    <Layout>
        <div class='backgrond2' style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
          <Form {...this.layout} name="basic" ref={this.formRef} >
          <Form.Item {...this.tailLayout1}>
            <label style={{ color: 'white',fontWeight:'bold'}}>Change Your Password</label>
          </Form.Item>
          
          <Form.Item label={<label style={{ color: 'white',fontWeight:'bold'}}>Current Pass</label>} rules={[{ required: true, message: 'Please input your Current Password!' }]} >
            <Input style={{marginLeft:'10%'}} id = 'input1' onChange={this.onChangePass}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>New Pass</label>} rules={[{ required: true, message: 'Please input your New password!' }]} >
            <Input style={{marginLeft:'10%'}} id = 'input2' onChange={this.onChangeNPass}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold'}}>Confirm Pass</label>} rules={[{ required: true, message: 'Please input your Confirm password!' }]} >
            <Input style={{marginLeft:'10%'}} id = 'input2' onChange={this.onChangeCPass}/>
          </Form.Item>

          <Form.Item {...this.tailLayout1}>
            <div>
              <Button onClick = {() => this.onClick()} style = {{ width: '10vh'}} type="primary" >
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button style = {{ width: '10vh'}} type="primary" onClick={() => this.onReset()} >
                Reset
              </Button>
            </div>
          </Form.Item>          
        </Form>
        </div>
    </Layout>
    );
  }
}

