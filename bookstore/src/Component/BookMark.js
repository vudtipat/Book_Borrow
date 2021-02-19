import React from 'react';
import 'antd/dist/antd.css';
import './custom.css'
import store from "store";
import Layout from '../Layout/Layout';
import { List, Card , Button, message} from 'antd';
export default class Bookmark extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data : []
    }
    this.getBookmard();
  }

  getBookmard = async() =>{
    var arr = [];
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        },
      };
      await fetch('/getBookmard?user='+store.get('token'), requestOptions)
        .then(response=> response.json())
        .then(myJson=> {
            myJson.forEach(element => {
                arr.push(element);
            });
            this.setState({data:arr});
        }) 
  }

  removeBookmark = async(id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
        },
    };
    await fetch('/removeBookmark?user='+store.get('token')+'&id='+id, requestOptions)
        .then(response=> response.json())
        .then(myJson=> {
            if(myJson.status == 'Pass')
            {
                message.info('ลบหนังสือเล่มนี้จาก Book Mark สำเร็จ');
                this.getBookmard();
            }
    }) 
  }

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

  render() {
    return (
      <Layout>
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
                  <Button style = {{width: 150}} type="primary" onClick={() => this.addtoList(item.BookID)}>
                    เพิ่มเข้ารายการ
                  </Button>
                  <br/><br/>
                  <Button style = {{width: 150}} type="primary" onClick={() => this.removeBookmark(item.BookID)} danger>
                    ลบจาก Book Mark
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
