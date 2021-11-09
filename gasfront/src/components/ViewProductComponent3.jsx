import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import '../App.css';

class ViewProductComponent3 extends Component {
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
        this.props.history.push('/product');

    }
    

    render() {
        return (
            <div>
               

                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Product Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Product ID: </label>
                            <div> { this.state.product.product_id}</div>
                        </div>
                        <div className = "row">
                            <label> Product Name: </label>
                            <div> { this.state.product.p_name }</div>
                        </div>
                        <div className = "row">
                            <label> Product Weight: </label>
                            <div> { this.state.product.weight }</div>
                        </div>
                        <div className = "row">
                            <label>Product Price: </label>
                            <div> { this.state.product.price }</div>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary" onClick={this.addCustomer}>Back</button>
            </div>
        )
    }
}

export default ViewProductComponent3
