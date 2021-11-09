import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';


class UpdateCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            customer_id: this.props.match.params.customer_id,
            name: '',
            address: '',
            phone: '',
            email: '',
            product_id:''
            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeProduct_idHandler = this.changeProduct_idHandler.bind(this);
        this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
        
           
            
            
        
    
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.customer_id === '_add'){
            return
        }else{
            CustomerService.getCustomerById(this.state.customer_id).then( (res) =>{
                let customer = res.data;
                this.setState({name: customer.name,
                    address: customer.address,
                    phone : customer.phone,
                    email : customer.email,
                    product_id : customer.product_id
                });
            });
        }        
    }
    saveOrUpdateCustomer = (e) => {
        e.preventDefault();
        let customer = {name: this.state.name, address: this.state.address, phone: this.state.phone,email:this.state.email,product_id:this.state.product_id};
        console.log('customer => ' + JSON.stringify(customer));

        // step 5
        if(this.state.customer_id === '_add'){
            CustomerService.createCustomer(customer).then(res =>{
                this.props.history.push('/add-payment/_add');
            });
        }else{
            CustomerService.updateCustomer(customer, this.state.customer_id).then( res => {
                this.props.history.push('/add-payment/_add');
            });
        }
    }

   

    viewCustomer(customer_id){
        this.props.history.push(`/view-customer/${customer_id}`);

    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }
    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeProduct_idHandler= (event) => {
        this.setState({product_id: event.target.value});
    }

    cancel(){
        this.props.history.push('/customer');

    }

    editCustomer(customer_id){
        this.props.history.push(`/update-customer/${customer_id}`);
    }

    getTitle(){
        if(this.state.customer_id === '_add'){
            return <h3 className="text-center">Enter Delivary Details</h3>
        }else{
            return <h3 className="text-center">Enter Delivary Details</h3>
        }
    }

    updateCustomer = (e) => {
        e.preventDefault();
        let customer = {name: this.state.name, address: this.state.address, phone: this.state.phone,email:this.state.email,product_id:this.state.product_id};
        console.log('customer => ' + JSON.stringify(customer));
        console.log('customer_id => ' + JSON.stringify(this.state.customer_id));
        CustomerService.updateCustomer(customer, this.state.customer_id).then( res => {
            this.props.history.push('/customer');
        });
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
                                            <label>  Name: </label>
                                            <input placeholder="Name" name="Name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input placeholder="Address" name="Address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone: </label>
                                            <input placeholder="Phone" name="Phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email : </label>
                                            <input placeholder="Email Address" name="Email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Product ID : </label>
                                            <input placeholder="Product_id" name="Product_id" className="form-control" 
                                                value={this.state.product_id} onChange={this.changeProduct_idHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateCustomer}>Update</button>
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

export default UpdateCustomerComponent
