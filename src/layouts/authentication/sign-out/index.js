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
import { useEffect } from "react";
import { logoutAPI } from "../../../api/authenAPI";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";

function SignOut() {
  const history = useHistory();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    let req = await logoutAPI();
    console.log('req logout', req);
    await setUser(null);
    localStorage.removeItem("user");
    return history.push("/authentication/sign-in");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

export default SignOut;
