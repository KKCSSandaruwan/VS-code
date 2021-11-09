import React, { Component } from 'react'
import ProfileService from '../services/ProfileService';


class CreateProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            customer_id: this.props.match.params.customer_id,
            name: '',
            address: '',
            phone: '',
            email: '',
           
            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        
        this.saveOrUpdateProfile = this.saveOrUpdateProfile.bind(this);
        
           
            
            
        
    
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.customer_id === '_add'){
            return
        }else{
            ProfileService.getProfileById(this.state.customer_id).then( (res) =>{
                let profile = res.data;
                this.setState({name: profile.name,
                    address: profile.address,
                    phone : profile.phone,
                    email : profile.email
                   
                });
            });
        }        
    }
    saveOrUpdateProfile = (e) => {
        e.preventDefault();
        let profile = {name: this.state.name, address: this.state.address, phone: this.state.phone,email:this.state.email};
        console.log('profile => ' + JSON.stringify(profile));

        // step 5
        if(this.state.customer_id === '_add'){
            ProfileService.createProfile(profile).then(res =>{
                this.props.history.push('/profile');
            });
        }else{
            ProfileService.updateProfile(profile, this.state.customer_id).then( res => {
                this.props.history.push('/profile');
            });
        }
    }

   

    viewProfile(customer_id){
        this.props.history.push(`/view-profile/${customer_id}`);

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

    

    cancel(){
        this.props.history.push('/profile');
    }

    getTitle(){
        if(this.state.customer_id === '_add'){
            return <h3 className="text-center">Enter Delivary Details</h3>
        }else{
            return <h3 className="text-center">Enter Delivary Details</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <h1>Enter Profile Details</h1>
                
                                    <div>                  
                           
                                    <form>
                                       
                                            <label>  Name: </label>
                                            <input type="text" placeholder="Name" name="Name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} required/>
                                             <br></br>
                                        
                                            <label> Address: </label>
                                            <input type="text" placeholder="Address" name="Address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler} required/>
                                            <br></br>
                                        
                                            <label> Phone: </label>
                                            <input type="text" placeholder="Phone" name="Phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler} required/>
                                            <br></br>

                                            <label> Email : </label>
                                            <input type="text" placeholder="Email Address" name="Email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler} required/>
                                            <br></br>
                                            

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProfile}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        
                                    </form>
                                </div>
             </div>             
                   
            
        )
    }
}

export default CreateProfileComponent
