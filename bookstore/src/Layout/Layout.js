import React, { useEffect, useState } from "react";
import { Layout, Menu  } from "antd";
import { Link, withRouter } from "react-router-dom";
import { routes } from "../Router";
import {useRedirectAuth} from '../Component/Login';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [notification, setNotification] = useState({});
  const auth = useRedirectAuth(props);
  if (auth) return auth;
  return (
    <Layout style={{ height: "100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.location.pathname]}
          defaultOpenKeys={[`/${props.location.pathname.split("/")[1]}`]}
          style={{ textAlign: "left" }}
          inlineCollapsed={collapsed}
        >
          {routes.map(route =>
            route.nav ? (
              route.subPage ? (
                <SubMenu
                  key={route.path}
                  icon={route.icon}
                  title={
                    <span>
                      <span>{route.name}</span>
                    </span>
                  }
                >
                  {route.subPage.map(sub => (
                    <Menu.Item key={`${route.path}${sub.path}`} icon={sub.icon}>
                      <Link to={`${route.path}${sub.path}`}>
                        <span className="nav-text">{sub.name}</span>
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={route.path} icon={route.icon}>
                  <Link to={route.path}>
                    <span className="nav-text">{route.name}</span>
                  </Link>
                </Menu.Item>
              )
            ) : null
          )}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
