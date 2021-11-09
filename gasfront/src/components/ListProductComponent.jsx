import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import '../App.css';
class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                product: []
        }
        
        
    }

   

    componentDidMount(){
        ProductService.getProduct().then((res) => {
            this.setState({ product: res.data});
        });
    }

    viewProduct(product_id){
        this.props.history.push(`/view-product3/${product_id}`);

    }

    makeDelivary(product_id){
        
    }
    editProduct(product_id){
        this.props.history.push(`/update-product/${product_id}`);
    }
    deleteProduct(product_id){
        ProductService.deleteProduct(product_id).then( res => {
            this.setState({product: this.state.product.filter(product => product.product_id !== product_id)});
        });
    }

    
    addProduct(){
        this.props.history.push('/add-product/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Product List</h2>
                
                 
                 <button style={{marginLeft: "10px"}} onClick={ () => this.addProduct()} className="btn btn-info">ADD Product</button>
                
                    
                 
                 <br></br>
                 <div className = "row">
                        <table id="customers">

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
                                             <button onClick={ () => this.editProduct(product.product_id)} className="btn btn-info">Update </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduct(product.product_id)} className="btn btn-danger">Delete </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewProduct(product.product_id)} className="btn btn-info">View </button>
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

export default ListProductComponent
