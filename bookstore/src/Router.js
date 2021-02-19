import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {AccountBookOutlined,HistoryOutlined,EditOutlined,BookOutlined,UserOutlined,LoginOutlined,UnorderedListOutlined } from '@ant-design/icons';

import Login from "./Component/Login";
import Homepage from "./Component/Homepage";
import Logout from './Component/Logout';
import Register from './Component/Register';
import Forget from './Component/ForgetPassword';
import History from './Component/History';
import ChangePassword from './Component/ChangePassword';
import Bookmark from './Component/BookMark';
import MyList from './Component/MyList';

export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage
  },
  {
    path: "/login",
    exact: true,
    component: Login
  },
  {
    path: "/register",
    exact: true,
    component: Register
  },
  {
    path: "/forgotPassword",
    exact: true,
    component: Forget
  },
  {
    path: "/Home",
    name: "Home",
    component: Homepage,
    icon: <AccountBookOutlined style={{ fontWeight:'20px' ,fontSize: '20px', color: 'white' }} />,
    nav: true
  },
  {
    path: "/Mylist",
    name: "My List",
    component: MyList,
    icon: <UnorderedListOutlined style={{ fontWeight:'20px' ,fontSize: '20px', color: 'white' }} />,
    nav: true
  },
  {
    path: "/History",
    name: "History",
    component: History,
    icon: <HistoryOutlined style={{ fontSize: '20px', color: 'white' }} />,
    nav: true
  },
  {
    path: "/Bookmark",
    name: "Book mark",
    component: Bookmark,
    icon: <BookOutlined  style={{ fontSize: '20px',color: 'white' }} />,
    nav: true
  },
  {
    path: "/account",
    name: "Account",
    icon: <UserOutlined style={{ fontSize: '20px', color: 'white'  }} />,
    nav: true,
    subPage: [
      {
        path: "/changePassword",
        name: "Change Password",
        component: ChangePassword,
        icon: <EditOutlined  style={{ fontSize: '20px',color: 'white'  }} />,
      }, {
        path: "/logout",
        name: "Logout",
        component: Logout,
        icon: <LoginOutlined  style={{ fontSize: '20px', color: 'white'  }} />,
        nav: true
      }
    ],
  },
];

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) =>
          route.subPage ? (
            route.subPage.map((sub, j) => (
              <Route
                key={`${i}_${j}`}
                {...sub}
                path={`${route.path}${sub.path}`}
              />
            ))
          ) : (
            <Route key={i} {...route} />
          )
        )}
      </Switch>
    </Router>
  );
};
