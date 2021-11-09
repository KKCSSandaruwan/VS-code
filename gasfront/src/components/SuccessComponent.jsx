import React, { Component } from 'react'
import PaymentService from '../services/PaymentService'

class SuccessComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                payment: []
        }
        this.addPayment = this.addPayment.bind(this);
        this.editPayment = this.editPayment.bind(this);
        this.deletePayment = this.deletePayment.bind(this);
    }

    deletePayment(id){
        PaymentService.deletePayment(id).then( res => {
            this.setState({payment: this.state.payment.filter(payment => payment.id !== id)});
        });
    }
    viewPayment(id){
        this.props.history.push(`/view-payment/${id}`);
    }
    editPayment(id){
        this.props.history.push(`/add-payment/${id}`);
    }

    componentDidMount(){
        PaymentService.getPayment().then((res) => {
            this.setState({ payment: res.data});
        });
    }

    addPayment(){
        this.props.history.push('/add-payment/_add');
    }

    render() {
        return (
            <div>
                 <h1>Your Payment Details added Successfully</h1>

            </div>
        )
    }
}

export default SuccessComponent