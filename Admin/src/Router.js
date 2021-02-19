import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ToolOutlined,PlusCircleOutlined ,MinusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

import Homepage from "./Component/Homepage";
import AddBook from './Component/AddBook';
import DeleteBook from './Component/DeleteBook';
export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage
  },
  {
    path: "/Home",
    name: "Home",
    component: Homepage,
    icon: <UnorderedListOutlined  style={{ fontSize: '20px', color: 'white'  }} />,
    nav: true
  },
  {
    path: "/Manage",
    name: "Manage Book",
    icon: <ToolOutlined style={{ fontSize: '20px', color: 'white'  }} />,
    nav: true,
    subPage: [
      {
        path: "/AddBook",
        name: "Add Book",
        component: AddBook,
        icon: <PlusCircleOutlined  style={{ fontSize: '20px', color: 'white'  }} />,
        nav: true
      }, {
        path: "/DeleteBook",
        name: "Delet Book",
        component: DeleteBook,
        icon: <MinusCircleOutlined  style={{ fontSize: '20px', color: 'white'  }} />,
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
