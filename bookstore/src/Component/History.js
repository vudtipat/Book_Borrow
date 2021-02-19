import React from 'react';
import 'antd/dist/antd.css';
import './custom.css'
import store from "store";
import Layout from '../Layout/Layout';
import { Table, Tag, Space } from 'antd';
export default class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    setInterval(() => this.getHistory(), 1000);
    
  }
  
  getHistory = async() => {
    var arr = [];
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        },
    };
    await fetch('/History?user='+store.get('token'), requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
          myJson.forEach(element => {
            arr.push(element);
          });
          this.setState({data:arr});
          console.log(this.state.data)
      }) 
  }

  columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: 'วันที่ยืม',
    dataIndex: 'startday',
    key: 'startday',
  },
  {
    title: 'วันที่ต้องคืน',
    dataIndex: 'endday',
    key: 'endday',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => (
      status == 0 ? 
        <Tag color={"blue"} key={status}>
          ยังไม่ได้มารับ
        </Tag> 
      :
      status == 1 ? 
        <Tag color={"volcano"} key={status}>
          มารับแล้ว
        </Tag> 
      :
        <Tag color={"green"} key={status}>
          คืนเรียบร้อย
        </Tag> 
    ),
  },
];

  render() {
    return (
      <Layout>
        <Table columns={this.columns} dataSource={this.state.data} />
      </Layout>
      
    );
  }
}
