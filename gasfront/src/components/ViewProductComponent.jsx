import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import '../App.css';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product_id: this.props.match.params.product_id,
            product: {}
        }
        this.addCustomer = this.addCustomer.bind(this);

        
       
        
        
    }

    
    
    

    componentDidMount(){
        ProductService.getProductById(this.state.product_id).then( res => {
            this.setState({product: res.data});
        })
    }

    addCustomer(){
        this.props.history.push('/add-customer/_add');

    }
    

    render() {
        return (
            <div>
               

                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Product Details</h3>
                    <div className = "card-body">
                        <table id="customers">
                           <tr> 
                        <div className = "row">
                            <td><label> Product ID: </label></td>
                           <td> <div> { this.state.product.product_id}</div></td>
                        </div>
                        </tr>
                        <tr>
                        
                           <td> <label> Product Name: </label> </td>
                           <td><div> { this.state.product.p_name }</div> </td>
                        
                        </tr>
                        <tr>
                        
                            <td> <label> Product Weight: </label> </td>
                            <td> <div> { this.state.product.weight }</div> </td>
                        
                        </tr>
                        <tr>
                        
                            <td><label>Product Price: </label> </td>
                            <td><div> { this.state.product.price }</div> </td>
                        
                        </tr>
                        
                        </table>
                    </div>

                </div>
                <button className="btn btn-primary" onClick={this.addCustomer}>Next</button>
            </div>
        )
    }
}

export default ViewProductComponent
