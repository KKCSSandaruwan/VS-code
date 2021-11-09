import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }
  listProduct(){
    this.props.history.push(`/product`);

}
listDelivary(){
  this.props.history.push(`/customer`);

}

listPayment(){
  this.props.history.push(`/payment`);

}

listProfile(){
  this.props.history.push(`/listprofile`);

}

  render() {
    return (
      <div className="container">
        
        <header className="jumbotron">
          
        </header>

        

        <button style={{marginLeft: "10px"}} onClick={ () => this.listProduct()} className="btn btn-info">Product Management</button>
        <button style={{marginLeft: "10px"}} onClick={ () => this.listDelivary()} className="btn btn-info">Delivary Management</button>
        <button style={{marginLeft: "10px"}} onClick={ () => this.listPayment()} className="btn btn-info">Payment Management</button>
        <button style={{marginLeft: "10px"}} onClick={ () => this.listProfile()} className="btn btn-info">Profile Management</button>

      </div>
    );
  }
}
