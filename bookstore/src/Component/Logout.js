import React, { useEffect } from "react";
import store from "store";

export default class Logout extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.location.pathname);
      if (props.location.pathname ==='/account/logout') {
        console.log('props.location.pathname');
        if (store.get("token")) {
            store.remove('token');
            props.history.push('/login');
            window.location.reload(false);
        }
    }
      
    }
  
  }