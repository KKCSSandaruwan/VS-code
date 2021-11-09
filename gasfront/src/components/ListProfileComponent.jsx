import React, { Component } from 'react'
import ProfileService from '../services/ProfileService'
import '../App.css';

class ListProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                profile: []
        }
        
        
    }

   

    componentDidMount(){
        ProfileService.getProfile().then((res) => {
            this.setState({ profile: res.data});
        });
    }

    viewProfile(customer_id){
        this.props.history.push(`/view-profile/${customer_id}`);

    }
   
    deleteProfile(customer_id){
        ProfileService.deleteProfile(customer_id).then( res => {
            this.setState({profile: this.state.profile.filter(profile => profile.customer_id !== customer_id)});
        });
    }

    editProfile(customer_id){
        this.props.history.push(`/update-profile/${customer_id}`);
    }
    
    
    render() {
        return (
            <div>
                 <h2 className="text-center">Order List</h2>
                 <div className = "row">
                    
                 </div>
                 <br></br>
                 <div className = "row">
                        <table id="customers">

                            <thead>
                                <tr>
                                    <th> Profile ID</th>
                                    <th> Customer Name</th>
                                    <th> Address</th>
                                    <th> Phone</th>
                                    <th>Email</th>
                                   
                                    <th>Actions</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.profile.map(
                                        profile => 
                                        <tr key = {profile.id}>
                                             <td>{profile.customer_id}</td>
                                             <td> {profile.name} </td>   
                                             <td> {profile.address} </td>   
                                             <td> {profile.phone}</td>
                                             <td> {profile.email}</td>
                                            
                                             <td>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewProfile(profile.customer_id)} className="btn btn-info">View Profile </button>
                                            
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProfile(profile.customer_id)} className="btn btn-danger">Delete </button>
                                             <button onClick={ () => this.editProfile(profile.customer_id)} className="btn btn-info">Update </button>
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

export default ListProfileComponent
