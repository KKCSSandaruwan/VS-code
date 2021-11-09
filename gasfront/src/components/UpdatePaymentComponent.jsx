import React, { Component } from 'react'
import PaymentService from '../services/PaymentService';

class UpdatePaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        this.updatePayment = this.updatePayment.bind(this);
    }

    componentDidMount(){
        PaymentService.getPaymentById(this.state.id).then( (res) =>{
            let payment = res.data;
            this.setState({name: payment.name,
                email: payment.email,
                card_number : payment.card_number,
                expiry_date : payment.expiry_date,
                cvv : payment.cvv,
            });
        });
    }

    updatePayment = (e) => {
        e.preventDefault();
        let payment = {name: this.state.name,  email: this.state.email, card_number: this.state.card_number, expiry_date: this.state.expiry_date, cvv: this.state.cvv };
        console.log('payment => ' + JSON.stringify(payment));
        console.log('id => ' + JSON.stringify(this.state.id));
        PaymentService.updatePayment(payment, this.state.id).then( res => {
            this.props.history.push('/payment');
        });
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
        this.props.history.push('/payment');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Customer Name: </label>
                                            <input placeholder="Customer Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeemailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Card Number: </label>
                                            <input placeholder="Card Number" name="card_number" className="form-control" 
                                                value={this.state.card_number} onChange={this.changecard_numberHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Expiry date: </label>
                                            <input placeholder="Expiry date" name="expiry_date" className="form-control" 
                                                value={this.state.expiry_date} onChange={this.changeexpiry_dateHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label>CVV: </label>
                                            <input placeholder="CVV" name="cvv" className="form-control" 
                                                value={this.state.cvv} onChange={this.changecvvHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.updatePayment}>Save</button>
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

export default UpdatePaymentComponent



