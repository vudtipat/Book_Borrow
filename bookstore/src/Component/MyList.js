import React from 'react';
import 'antd/dist/antd.css';
import './custom.css'
import store from "store";
import Layout from '../Layout/Layout';
import { Table, message , Button, Modal, DatePicker,Space} from 'antd';
export default class MyList extends React.Component {

  constructor(props) {
    super(props);
    var startday = new Date();
    var endday = new Date();
    endday.setDate(startday.getDate()+7);
    this.state = {
        data : [],
        visible : false,
        start : startday.getFullYear()+'-'+parseInt(startday.getMonth()+1)+'-'+startday.getDate(),
        end : endday.getFullYear()+'-'+parseInt(endday.getMonth()+1)+'-'+endday.getDate(),
    }
    this.getList();
    
  }

  getList = async() =>{
    var arr = [];
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        },
      };
      await fetch('/getList?user='+store.get('token'), requestOptions)
        .then(response=> response.json())
        .then(myJson=> {
            myJson.forEach(element => {
                arr.push(element);
            });
            this.setState({data:arr});
            console.log(this.state.data);
        }) 
  }

  removeList = async(id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
        },
    };
    await fetch('/removeList?user='+store.get('token')+'&id='+id, requestOptions)
        .then(response=> response.json())
        .then(myJson=> {
            if(myJson.status == 'Pass')
            {
                message.info('ลบหนังสือเล่มนี้จากรายงานสำเร็จ');
                this.getList();
            }
    }) 
  }

  

  columns = [
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
      title: 'Action',
      render: (data) => (
        <Button style = {{ width: '10vh'}} type="primary" onClick={() => this.removeList(data.BookID)} danger >
            Delete
        </Button>
      ),
    },
  ];

  onSubmit = async() =>
  {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: this.state.data , start :this.state.start,end : this.state.end })
      };
      await fetch('/Borrow?user='+store.get('token'), requestOptions)
        .then(response=> {
            response.json();
        });
  }

  handleOk = (e) => {
    this.onSubmit();
    this.setState({
        visible: false
    });
    this.getList();
    window.location.reload(false);
  }

  handleCancel = (e) => {
    this.setState({
        visible: false
    });
  }

  onClick = () => {
    this.setState({
        visible: true
    });
    
  }
  render() {
    return (
        <Layout>
            <Table columns={this.columns} dataSource={this.state.data} />
            <div style={{ display: "flex",justifyContent:'flex-end' }}>
                <Button className="float-right" style = {{width: '30vh'}} type="primary" onClick={() => this.onClick()}>
                    ดำเนินการ
                </Button>
            </div>  
            <Modal
                title="Confirm"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <pre>วันที่คุณจะขอยืม{"\t"}คือ&nbsp; {this.state.start}</pre>
                <pre>วันที่คุณจะต้องคืน{"\t"}คือ&nbsp; {this.state.end}</pre>

            </Modal>
        </Layout>
      
    );
  }
}
