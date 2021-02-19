import React from 'react';
import 'antd/dist/antd.css';
import './custom.css'
import { List, Card , Button, Input, message} from 'antd';
import store from "store";
import Layout from '../Layout/Layout';
export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text : '',
      data : []
    };
    setInterval(() => this.getAllbook(), 1000);
  }
  
  search = async(text) =>{
    var arr = [];
    console.log(text);
    var data = [];
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json',
      },
    };
    await fetch('/Search?search='+text, requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        myJson.forEach(data =>
         {arr.push(data);}
        );
        this.setState({data:arr});
      }) 
  }

  getAllbook = async() => {
    var data = [];
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json',
      },
    };
    await fetch('/allbook', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        myJson.forEach(element => {
          console.log(element);
          data.push(element);
        });
        this.setState({data:data})
      }) 
  };

  addBookmark = async(id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: store.get('token') ,id : id})
    };
    await fetch('/Addbookmark', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          message.info('เพิ่มเข้า Book Mark สำเร็จ');
        }
        else{
          message.info('หนังสือเล่มนี้ถูกเพิ่มใน Book Mark ไปแล้ว'); 
        }
      }) 
    
  };

  addtoList = async(id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: store.get('token') ,id : id})
    };
    await fetch('/AddList', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        if(myJson.status == 'Pass')
        {
          message.info('เพิ่มเข้ารายการสำเร็จ');
        }
        else if(myJson.status == 'Full')
        {
          message.info('ไม่สามารถเพิ่มรายการได้แล้ว');
        }
        else{
          message.info('หนังสือเล่มนี้ถูกเพิ่มในรายการไปแล้ว'); 
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
  render() {
    var Search = Input.Search;
    return (
      <Layout>
        <Search
          placeholder="input search text"
          style={{ width: 500 }}
          onSearch={value => this.search(value)}
        />
        <br/><br/><br/>
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.data}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 8,
            }}
            renderItem={item => (
              <List.Item>
                <div>
                <Card hoverable style={{ width: 270 }} title={item.Name} cover={<img alt="example" src={item.url} />}>
                  <p>Author : {item.Author}</p>
                  <p>Year: {item.Year}</p>
                  <p>Stock : {item.stock}</p>
                  <div>
                  <Button style = {{ width: 150}} type="primary" onClick={() => this.addtoList(item.BookID)} >
                    เพิ่มเข้ารายการ
                  </Button>
                  <br/><br/>
                  <Button style = {{  width: 150}} type="primary" onClick={() => this.addBookmark(item.BookID)} >
                    เพิ่มเข้า Book Mark
                  </Button>
                </div>
                </Card>
                </div>
              </List.Item>
            )}
          />
      </Layout>
      
    );
  }
}
