import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class UpdateProductComponent extends Component {
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
        this.updateProduct = this.updateProduct.bind(this);
       
    }

    // step 3
    componentDidMount(){
        ProductService.getProductById(this.state.product_id).then( (res) =>{
            let product = res.data;
            this.setState({p_name: product.p_name,
                weight: product.weight,
                price: product.price
            });
        });
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


    updateProduct = (e) => {
        e.preventDefault();
        let product = {p_name: this.state.p_name, weight: this.state.weight, price: this.state.price};
        console.log('product => ' + JSON.stringify(product));
        console.log('product_id => ' + JSON.stringify(this.state.product_id));
        ProductService.updateProduct(product, this.state.product_id).then( res => {
            this.props.history.push('/product');
        });
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

    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        
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

                                        <button className="btn btn-success" onClick={this.updateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                
                            
                        

                   </div>
            </div>
        )
    }
}

export default UpdateProductComponent