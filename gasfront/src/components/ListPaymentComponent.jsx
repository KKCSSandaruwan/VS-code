import React, { Component } from 'react'
import PaymentService from '../services/PaymentService'

class ListPaymentComponent extends Component {
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
        this.props.history.push(`/update-payment/${id}`);
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
                 <h2 className="text-center">Payment List</h2>
                 <div className = "row">
                    
                 </div>
                 <br></br>
                 <div className = "row">
                        <table id="customers">

                            <thead>
                                <tr>
                                    <th> Customer Name</th>
                                    <th> Email</th>
                                    <th> Card Number</th>
                                    <th> Expiry date</th>
                                    <th> CVV Number</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.payment.map(
                                        payment => 
                                        <tr key = {payment.id}>
                                             <td> { payment.name} </td>   
                                             <td> {payment.email}</td>
                                             <td> {payment.card_number}</td>
                                             <td> {payment.expiry_date}</td>
                                             <td> {payment.cvv}</td>
                                             <td>
                                                 <button onClick={ () => this.editPayment(payment.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deletePayment(payment.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewPayment(payment.id)} className="btn btn-info">View </button>
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

export default ListPaymentComponent