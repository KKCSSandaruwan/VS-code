import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            product_id: this.props.match.params.product_id,
            p_name: '',
            weight: '',
            price: ''
        }
        this.changeP_nameHandler = this.changeP_nameHandler.bind(this);
        this.changeWeightHandler = this.changeWeightHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.product_id === '_add'){
            return
        }else{
            ProductService.getProductById(this.state.product_id).then( (res) =>{
                let product = res.data;
                this.setState({p_name: product.p_name,
                    weight: product.weight,
                    price : product.price
                });
            });
        }        
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {p_name: this.state.p_name, weight: this.state.weight, price: this.state.price};
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.product_id === '_add'){
            ProductService.createProduct(product).then(res =>{
                this.props.history.push('/product');
            });
        }else{
            ProductService.updateProduct(product, this.state.product_id).then( res => {
                this.props.history.push('/product');
            });
        }
    }
    
    changeP_nameHandler= (event) => {
        this.setState({p_name: event.target.value});
    }

    changeWeightHandler= (event) => {
        this.setState({weight: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    cancel(){
        this.props.history.push('/product');
    }

    getTitle(){
        if(this.state.product_id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Product Name: </label>
                                            <input placeholder="P_name" name="p_name" className="form-control" 
                                                value={this.state.p_name} onChange={this.changeP_nameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Weight: </label>
                                            <input placeholder="Weight" name="weight" className="form-control" 
                                                value={this.state.weight} onChange={this.changeWeightHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProductComponent