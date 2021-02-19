import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import './custom.css'
import store from "store";

export default class Login extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      postId: '',
      status: '',
    };
    useRedirectAuth(this.props);
    
    
  }

  fetchUser = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.state.user ,pass : this.state.pass})
    };
    await fetch('/login', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          store.set("token", this.state.user);
          this.props.history.push("/");
        }
        else{
          message.info('UserName หรือ Password ผิด'); 
        }
      }) 
  };

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
            this.fetchUser();
          }
      
    }
    //console.log(this.state.status);
  };

  onClickRegister = () => {
    this.props.history.push("/register");
  }

  onClickforget = () => {
    this.props.history.push("/forgotPassword");
  }

  onReset =  () => {
    this.setState({user:''});
    this.setState({pass:''});
    this.formRef.current.resetFields();
  };

  onChangeUser = (e) => {
    this.setState({user:e.target.value})
  };

  onChangePass = (e) => {
    this.setState({pass:e.target.value})
  };

  render() {
    return (
      <div class='centered'>
        <div class='backgrond' style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
          <Form {...this.layout} name="basic" ref={this.formRef} >
          <Form.Item {...this.tailLayout1}>
            <label style={{ color: 'white',fontWeight:'bold'}}>WELLCOME TO LIBRARY</label>
          </Form.Item>
          
          <Form.Item label={<label style={{ color: 'white',fontWeight:'bold' }}>Username</label>} name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input id = 'input1' onChange={this.onChangeUser}/>
          </Form.Item>

          <Form.Item  label={<label style={{ color: 'white',fontWeight:'bold' }}>Password</label>}  name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password id = 'input2' onChange={this.onChangePass}/>
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

          <Form.Item {...this.tailLayout}>
            <div style={{display: 'flex',justifyContent:'flex-end'}}>
              <a style={{ color: 'white',fontWeight:'bold' }} onClick={() => this.onClickRegister()}> Register</a>&nbsp;&nbsp;&nbsp;
              <a style={{ color: 'white',fontWeight:'bold' }} onClick={() => this.onClickforget()}>Forget Password</a>
          </div>
          </Form.Item>
          
        </Form>
        </div>
      </div>
    );
  }
}

export const useRedirectAuth = props => {
  if (props.location.pathname != "/login" || props.location.pathname =='/account/logout') {
    if (!store.get("token")) {
      props.history.push("/login");
    }
  } else if (props.location.pathname == "/login") {
    if (store.get("token")) {
      props.history.push("/");
    }
  }
};
