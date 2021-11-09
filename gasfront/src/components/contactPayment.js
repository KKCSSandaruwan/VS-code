import React, { Component } from "react";

import emailjs from 'emailjs-com';
import { form } from 'react-validation/build/form';


const contactPayment = () => {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_c5nqrnp', 'template_gkirw0t', e.target, 'user_0JHHsW2L70INm9KEkZHBE')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (


        <div class="form">
                                       <div class="title">Welcome</div>
                                       <div class="subtitle">Let's enter your payment details!</div>


        <form onSubmit={sendEmail}>

            <label > Customer Name: </label>

            <input type="text" placeholder=" " className="form-control"  name="customername" required />







            <label > Email: </label>



            <input type="email" placeholder=" " className="form-control" name="email" required />






            <label > Card Number: </label>

            <input maxlength="16" type="text" placeholder=" " name="cardnumber" className="form-control" required />






            <label > Expiry date: </label>


            <input className="form-control" type="date" placeholder=" " name="date" required />







            <label >CVV: </label>


            <input maxlength="3" className="form-control" type="text" placeholder=" " name="cvv" required />




            <br></br>


            <button className="btn btn-success" type="submit"  >Save</button>
            <button className="btn btn-danger"   >Cancel</button>


        </form>

        </div>

    )
}
export default contactPayment