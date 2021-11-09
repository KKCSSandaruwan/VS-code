import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'

class ViewCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_id: this.props.match.params.customer_id,
            customer: {}
        }
        this.addCustomer = this.addCustomer.bind(this);
    }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.customer_id).then( res => {
            this.setState({customer: res.data});
        })
    }

    addCustomer(){
        this.props.history.push('/customer');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Customer Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>  Name: </label>
                            <div> { this.state.customer.name}</div>
                        </div>
                        <div className = "row">
                            <label> Address: </label>
                            <div> { this.state.customer.address}</div>
                        </div>
                        <div className = "row">
                            <label> Phone: </label>
                            <div> { this.state.customer.phone}</div>
                        </div>
                        <div className = "row">
                            <label>Email: </label>
                            <div> { this.state.customer.email }</div>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary" onClick={this.addCustomer}>Back</button>
            </div>
        )
    }
}

export default ViewCustomerComponent
