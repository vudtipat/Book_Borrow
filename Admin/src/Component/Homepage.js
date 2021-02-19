import React from 'react';
import { Table, message , Button, Input, Menu, Tag, Space} from 'antd';
import Layout from '../Layout/Layout';
import { SearchOutlined } from '@ant-design/icons';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      searchText: '',
      searchedColumn: '',
    };
    setInterval(() => this.getAlllist(), 1000);
  }
  
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

  getAlllist = async() => {
    var data = [];
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json',
      },
    };
    await fetch('/getAllList', requestOptions)
      .then(response=> response.json())
      .then(myJson=> {
        myJson.forEach(element => {
          console.log(element);
          data.push(element);
        });
        data.reverse();
        this.setState({data:data})
      }) 
  };


  columns = [
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      ...this.getColumnSearchProps('username'),
    },
    {
        title: 'BookID',
        dataIndex: 'BookID',
        key: 'BookID',
    },
    {
        title: 'BookName',
        dataIndex: 'Name',
        key: 'Name',
    },
    {
      title: 'StartDay',
      dataIndex: 'startday',
      key: 'startday',
      ...this.getColumnSearchProps('startday'),
    },
    {
      title: 'EndDay',
      dataIndex: 'endday',
      key: 'endday',
      ...this.getColumnSearchProps('endday'),
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
    {
      title: 'Action',
      render: (data) => (
        <Space>
          <a onClick={ () => this.updateone(data)}>มารับแล้ว</a>
          <a onClick={ () => this.updatetwo(data)}>มาคืนแล้ว</a>
        </Space> 
      ),
    },
  ];

  updateone = async(data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data.username , ID : data.BookID })
    };
    await fetch('/updateone', requestOptions)
      .then(response=> {
          response.json();
          message.info('Update สำเร็จ');
          this.getAlllist();
      });
      
  }

  updatetwo = async(data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data.username , ID : data.BookID, stock : data.stock })
    };
    await fetch('/updatetwo', requestOptions)
      .then(response=> {
          response.json();
      });
      message.info('Update สำเร็จ');
      this.getAlllist();
      this.forceUpdate()
  }

  
  onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  render() {
    return (
        <Layout>
            <Table columns={this.columns} dataSource={this.state.data} onChange={this.onChange}/>
        </Layout>
      
    );
  }
}
