import React, { Component } from 'react'
import PaymentService from '../services/PaymentService'

class ViewPaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            payment: {}
        }
    }

    componentDidMount(){
        PaymentService.getPaymentById(this.state.id).then( res => {
            this.setState({payment: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Payment Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Customer Name: </label>
                            <div> { this.state.payment.name }</div>
                        </div>
                        <div className = "row">
                            <label>  Email: </label>
                            <div> { this.state.payment.email }</div>
                        </div>
                        <div className = "row">
                            <label> card number: </label>
                            <div> { this.state.payment.card_number }</div>
                        </div>
                        <div className = "row">
                            <label> expiry date: </label>
                            <div> { this.state.payment.expiry_date }</div>
                        </div>
                        <div className = "row">
                            <label> CVV: </label>
                            <div> { this.state.payment.cvv }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewPaymentComponent