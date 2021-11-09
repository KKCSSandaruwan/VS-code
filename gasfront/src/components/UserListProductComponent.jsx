import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import '../App.css';
class UserListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                product: []
        }
        this.viewProduct =this.viewProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        
    }
view
   

    componentDidMount(){
        ProductService.getProduct().then((res) => {
            this.setState({ product: res.data});
        });
    }

    viewProduct(product_id){
        this.props.history.push(`/view-product/${product_id}`);

    }
    deleteProduct(product_id){
        ProductService.deleteProduct(product_id).then( res => {
            this.setState({product: this.state.product.filter(product => product.product_id !== product_id)});
        });
    }
    
    editProduct(product_id){
        this.props.history.push(`/add-product/${product_id}`);
    }

    

    

    
    
    render() {
        return (
            <div>
                 <h2 className="text-center">Product List</h2>
                 <div className = "row">
                    
                 </div>
                 <br></br>
                 <div className = "row">
                        <table border="1px">

                            <thead>
                                <tr>
                                <th> Product ID</th>
                                    <th> Product Name</th>
                                    <th> weight</th>
                                    <th> Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.product.map(
                                        product => 
                                        <tr key = {product.id}>
                                             <td>{product.product_id}</td>
                                             <td> {product.p_name} </td>   
                                             <td> {product.weight}</td>
                                             <td> {product.price}</td>
                                             <td>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewProduct(product.product_id)} className="btn btn-info">BUY </button>
                                             
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

export default UserListProductComponent
