import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'
import '../App.css';

class ListCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                customer: []
        }
        
        
    }

   

    componentDidMount(){
        CustomerService.getCustomer().then((res) => {
            this.setState({ customer: res.data});
        });
    }

    viewCustomer(customer_id){
        this.props.history.push(`/view-customer/${customer_id}`);

    }
    viewProduct(product_id){
        this.props.history.push(`/view-product1/${product_id}`);

    }

    deleteCustomer(customer_id){
        CustomerService.deleteCustomer(customer_id).then( res => {
            this.setState({customer: this.state.customer.filter(customer => customer.customer_id !== customer_id)});
        });
    }

    editCustomer(customer_id){
        this.props.history.push(`/update-customer/${customer_id}`);
    }
    
    
    render() {
        return (
            <div>
                 <h2 className="text-center">Order List</h2>
                 <div className = "row">
                    
                 </div>
                 <br></br>
                 <div className = "row">
                        <table id="customers">

                            <thead>
                                <tr>
                                    <th> Order ID</th>
                                    <th> Customer Name</th>
                                    <th> Address</th>
                                    <th> Phone</th>
                                    <th>Email</th>
                                    <th>Product ID</th>
                                    <th>Actions</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customer.map(
                                       customer => 
                                        <tr key = {customer.id}>
                                             <td>{customer.customer_id}</td>
                                             <td> {customer.name} </td>   
                                             <td> {customer.address} </td>   
                                             <td> {customer.phone}</td>
                                             <td> {customer.email}</td>
                                             <td> {customer.product_id}</td>

                                             <td>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewCustomer(customer.customer_id)} className="btn btn-info">View Customer </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewProduct(customer.product_id)} className="btn btn-info">View Product </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCustomer(customer.customer_id)} className="btn btn-danger">Delete </button>
                                             <button onClick={ () => this.editCustomer(customer.customer_id)} className="btn btn-info">Update </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListCustomerComponent
