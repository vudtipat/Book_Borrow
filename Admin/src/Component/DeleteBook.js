import React from 'react';
import 'antd/dist/antd.css';
import Layout from '../Layout/Layout';
import { Table, Button, message, Input } from 'antd';
export default class DeleteBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.getAllbook();
  }
  
  columns = [
    {
        title: 'No.',
        dataIndex: 'BookID',
        key: 'BookID',
      },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
        title: 'Author',
        dataIndex: 'Author',
        key: 'Author',
    },
    {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
      title: 'Action',
      render: (data) => (
        <Button style = {{ width: '10vh'}} type="primary" onClick={() => this.deleteBook(data.BookID)} danger >
            Delete
        </Button>
      ),
    },
  ];

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

  deleteBook = async(id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
        },
    };
    await fetch('/Delete?id='+id, requestOptions)
        .then(response=> response.json())
        .then(myJson=> {
            if(myJson.status == 'Pass')
            {
                message.info('ลบหนังสือสำเร็จ');
                this.getAllbook();
            }
    }) 
  }

  render() {
    return (
        <Layout>
            <Table columns={this.columns} dataSource={this.state.data} />
        </Layout>
      
    );
  }
}
