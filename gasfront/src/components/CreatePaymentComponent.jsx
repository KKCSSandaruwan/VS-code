import React, { Component } from 'react'
import PaymentService from '../services/PaymentService';
import "../App.css"
class CreatePaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            email: '',
            card_number: '',
            expiry_date: '',
            cvv: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.changecard_numberHandler = this.changecard_numberHandler.bind(this);
        this.changeexpiry_dateHandler = this.changeexpiry_dateHandler.bind(this);
        this.changecvvHandler = this.changecvvHandler.bind(this);
        this.saveOrUpdatePayment = this.saveOrUpdatePayment.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            PaymentService.getPaymentById(this.state.id).then( (res) =>{
                let payment = res.data;
                this.setState({name: payment.name,
                    email: payment.email,
                    card_number : payment.card_number,
                    expiry_date : payment.expiry_date,
                    cvv : payment.cvv

                });
            });
        }        
    }
    saveOrUpdatePayment = (e) => {
        e.preventDefault();
        let payment = {name: this.state.name, email: this.state.email, card_number: this.state.card_number, expiry_date: this.state.expiry_date, cvv: this.state.cvv };
        console.log('payment => ' + JSON.stringify(payment));

        // step 5
        if(this.state.id === '_add'){
            PaymentService.createPayment(payment).then(res =>{
                this.props.history.push('/success');
            });
        }else{
            PaymentService.updatePayment(payment, this.state.id).then( res => {
                this.props.history.push('/success');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeemailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changecard_numberHandler= (event) => {
        this.setState({card_number: event.target.value});
    }

    changeexpiry_dateHandler= (event) => {
        this.setState({expiry_date: event.target.value});
    }

    changecvvHandler= (event) => {
        this.setState({cvv: event.target.value});
    }

    cancel(){
        this.props.history.push('/product-user');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Payment</h3>
        }else{
            return <h3 className="text-center">Update Payment</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   
                        


                                  
                                
                                       <div class="title">Welcome</div>
                                       <div class="subtitle">Let's enter your payment details!</div>
                                     




                                    <form>
                                           
                                            <label > Customer Name: </label>
                                            
                                            <input   type="text" placeholder=" " className="form-control" value={this.state.name} onChange={this.changenameHandler} required/>
                                            
                                                

                                               
                                           


                                            <label > Email: </label>
                                                                              
                                            
                                            
                                            <input   type="email" placeholder=" " className="form-control" value={this.state.email} onChange={this.changeemailHandler} required/>
                                                
                                              
                                            


                                        
                                              <label > Card Number: </label>
                                            
                                            <input  maxlength="16"   type="text" placeholder=" " className="form-control" value={this.state.card_number} onChange={this.changecard_numberHandler} required/>
                                                
                                                
                                            
                                           
                                                
                                        
                                                <label > Expiry date: </label>
                                           
                                            
                                            <input className="form-control" type="date" placeholder=" " value={this.state.expiry_date} onChange={this.changeexpiry_dateHandler} required/>
                                                
                                                
                                            
                                            
                                                
                                        

                                            <label >CVV: </label>
                                            
                                            
                                            <input maxlength="3"  className="form-control" type="text" placeholder=" "  value={this.state.cvv} onChange={this.changecvvHandler} required/>
                                               
                                            
                                                
                                           
                                               <br></br>
                                        

                                        <button className="btn btn-success"  onClick={this.saveOrUpdatePayment}>Save</button>
                                        <button className="btn btn-danger"   onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}} >Cancel</button>
                                    </form>
                              
                            
                        

                   
            </div>
        )
    }
}

export default CreatePaymentComponent