import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom'
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";

import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import UserListProductComponent from './components/UserListProductComponent';
import ListProductComponent from './components/ListProductComponent';






import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewProductComponent from './components/ViewProductComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';

import ListCustomerComponent from './components/ListCustomerComponent';
import ViewProductComponent1 from './components/ViewProductComponent1';
import ViewProductComponent3 from './components/ViewProductComponent3';
import UpdateCustomerComponent from './components/UpdateCustomerComponent';

import ListPaymentComponent from './components/ListPaymentComponent';
import ListProfileComponent from './components/ListProfileComponent';

import SuccessComponent from './components/SuccessComponent';

import CreatePaymentComponent from './components/CreatePaymentComponent';
import CreateProductComponent from './components/CreateProductComponent';
import CreateProfileComponent from './components/CreateProfileComponent';
import UpdatePaymentComponent from './components/UpdatePaymentComponent.jsx';
import UpdateProductComponent from './components/UpdateProductComponent.jsx';
import UpdateProfileComponent from './components/UpdateProfileComponent.jsx';
import ViewPaymentComponent from './components/ViewPaymentComponent';
import ViewProfileComponent from './components/ViewProfileComponent';
import contactPayment from "./components/contactPayment";



 //import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>





        <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

            <Route path = "/home" component = {UserListProductComponent}></Route>
            <Route path = "/product-user" component = {UserListProductComponent}></Route>
            <Route path = "/add-product/:product_id" component = {CreateProductComponent}></Route>
            
            <Route path = "/product" component = {ListProductComponent}></Route>
            <Route path = "/view-product/:product_id" component = {ViewProductComponent}></Route>
            <Route path = "/add-customer/:customer_id" component = {CreateCustomerComponent}></Route>
            
            <Route path = "/view-customer/:customer_id" component = {ViewCustomerComponent}></Route>
            <Route path = "/customer" component = {ListCustomerComponent}></Route>
            <Route path = "/view-product1/:product_id" component = {ViewProductComponent1}></Route>
            <Route path = "/view-product3/:product_id" component = {ViewProductComponent3}></Route>
                         
            <Route path = "/update-customer/:customer_id" component = {UpdateCustomerComponent}></Route> 
            <Route path = "/update-product/:product_id" component = {UpdateProductComponent}></Route> 

            <Route path = "/payment" component = {ListPaymentComponent}></Route>
            <Route path = "/success" component = {SuccessComponent}></Route>
            
            <Route path = "/add-payment/:id" component = {CreatePaymentComponent}></Route>
            <Route path = "/view-payment/:id" component = {ViewPaymentComponent}></Route>
            <Route path = "/view-profile/:customer_id" component = {ViewProfileComponent}></Route>

           <Route path = "/update-payment/:id" component = {UpdatePaymentComponent}></Route>
           <Route path = "/update-profile/:customer_id" component = {UpdateProfileComponent}></Route>

           <Route path = "/add-profile/:customer_id" component = {CreateProfileComponent}></Route>
           <Route path = "/listprofile" component = {ListProfileComponent}></Route>
            <Route path = "/contactPayment" component ={contactPayment} ></Route>

          </Switch>
        </div>

       
      </Router> 
               
      </div>
    );
  }
}

export default App;
