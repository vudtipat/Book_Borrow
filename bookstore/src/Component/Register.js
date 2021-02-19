import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button , DatePicker, Space, message} from 'antd';
import './custom.css'
export default class Register extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      email:'',
      id: '',
      birthday : ''
    };
  }

  formRef = React.createRef();

  regis = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.state.user ,pass : this.state.pass, email:this.state.email,id:this.state.id,birthday:this.state.birthday})
    };
    await fetch('/register', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          this.props.history.push("/login");
        }
        else{
          message.info('ไม่สามารถสมัครสมาชิกได้กรุณาตรวจสอบข้อมูล'); 
        }
      }) 
  };

  onClick =  () =>  {
    if(this.state.user == '' && this.state.pass == ''  && this.state.id == ''  && this.state.email == ''  && this.state.birthday == '')
    {
      message.info('กรุณากรอกข้อมูลให้ครบ');
    }
    else if(this.state.id.length != 13)
    {
      message.info('รหัสบัตรประชาชนผิดพลาด');
    }
    else if(this.state.id.length == 13)
    {
      var check = 1;
      for(var i=0;i<13;i++)
      {
        if(Number.isInteger(parseInt(this.state.id[i])))
        {
          check = 1;
        }
        else{
          check = 0;
          break;
        }
      }
      if(check == 1)
      {
        if(this.state.user != '' && this.state.pass != ''  && this.state.id != ''  && this.state.email != ''  && this.state.birthday != '')
        {
          var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if(format.test(this.state.user))
          {
            message.info('กรุณากรอกข้อมูลให้ถูกต้อง');
          }
          else
          {
            this.regis();
          }
        }
        else
        {
          message.info('กรุณากรอกข้อมูลให้ครบ');
        }
        
      }
      else{
        message.info('รหัสบัตรประชาชนผิดพลาด');
      }
    }
    
  };

  onChangedate =  (date, dateString) =>  {
    this.setState({birthday:dateString});
  };

  onReset =  () => {
    this.setState({user:''});
    this.setState({pass:''});
    this.setState({email:''});
    this.setState({id:''});
    this.setState({birthday:''});
    this.formRef.current.resetFields();
  };

  onChangeUser = (e) => {
    this.setState({user:e.target.value})
  };

  onChangePass = (e) => {
    this.setState({pass:e.target.value})
  };

  onChangeEmail = (e) => {
    this.setState({email:e.target.value})
  };

  onChangeID = (e) => {
    this.setState({id:e.target.value})
  };


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
  
  render() {
    return (
      <div class='centered_Register'>
        <div class='backgrond1' style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
          <Form {...this.layout} name="basic" ref={this.formRef} style={{marginRight:'10%'}} >
          <Form.Item {...this.tailLayout1}>
            <label style={{ color: 'white',fontWeight:'bold'}}>REGISTER</label>
          </Form.Item>
          
          <Form.Item label={<label style={{ color: 'white',fontWeight:'bold' }}>Username : </label>} name="username" rules={[{ required: true, message: 'Please input your username!' },]} >
            <Input style={{marginLeft:'10%',marginRight:'5%'}} id = 'input1' onChange={this.onChangeUser}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>Password :</label>}  name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password style={{marginLeft:'10%',marginRight:'5%'}} id = 'input2' onChange={this.onChangePass}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>Email :</label>}  name="Email" rules={[{ required: true, message: 'Please input your email!' }]} >
            <Input style={{marginLeft:'10%',marginRight:'5%'}} id = 'input2' onChange={this.onChangeEmail}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>ID Number :</label>}  name="ID" rules={[{ required: true, message: 'Please input your ID!' }]} >
            <Input style={{marginLeft:'10%',marginRight:'5%'}} id = 'input2' onChange={this.onChangeID}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>BirthDay :</label>}  name="Date" rules={[{ required: true, message: 'Please input your birthday!' }]} >
            <Space direction="vertical">
                <DatePicker onChange={this.onChangedate} />
            </Space>
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
      </div>
    );
  }
}