import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import './custom.css'

export default class Forget extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
      pass:''
    };
  }

  formRef = React.createRef();

  onClick =  () =>  {
    if(this.state.user == '' || this.state.pass == '')
    {
      message.info('กรุณากรอกข้อมูลให้ครบ');
    }
    else{
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if(format.test(this.state.user))
      {
         message.info('กรุณากรอกข้อมูลให้ถูกต้อง');
      }
      else
      {
        this.updatepass();
      }   
    }
    
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

  onReset =  () => {
    this.setState({user:''});
    this.setState({pass:''});
    this.formRef.current.resetFields();
  };

  updatepass = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.state.user ,pass : this.state.pass, email:this.state.email})
    };
    await fetch('/forgetpass', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          this.props.history.push("/login");
        }
        else{
          message.info('กรุณาตรวจสอบข้อมูล'); 
        }
      }) 
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
      <div class='centered_Forget'>
        <div class='backgrond' style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
          <Form {...this.layout} name="basic" ref={this.formRef} style={{marginRight:'10%'}} >
          <Form.Item {...this.tailLayout1}>
            <label style={{ color: 'white',fontWeight:'bold'}}>Forget Password</label>
          </Form.Item>
          
          <Form.Item label={<label style={{ color: 'white',fontWeight:'bold' }}>Username : </label>} name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input style={{marginLeft:'10%',marginRight:'5%'}} id = 'input1' onChange={this.onChangeUser}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>Email :</label>}  name="Email" rules={[{ required: true, message: 'Please input your email!' }]} >
            <Input style={{marginLeft:'10%',marginRight:'5%'}} id = 'input2' onChange={this.onChangeEmail}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>New Pass :</label>}  name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password style={{marginLeft:'10%',marginRight:'5%'}} id = 'input2' onChange={this.onChangePass}/>
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