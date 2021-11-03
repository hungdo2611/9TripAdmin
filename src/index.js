/**
=========================================================
* 9Trip Admin React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// 9Trip Admin React Context Provider
import { SoftUIControllerProvider } from "context";

import { AuthProvider } from "auth-context/auth.context";
import { instanceData } from "./model";
import 'antd/dist/antd.css';
let user = localStorage.getItem("user");
user = JSON.parse(user);
if (user) {
  instanceData.token = user.token;
}
ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <AuthProvider userData={user}>
        <App />
      </AuthProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
