import React, { Component } from 'react'
import ProfileService from '../services/ProfileService'

class ViewProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_id: this.props.match.params.customer_id,
            profile: {}
        }
        this.addProfile = this.addProfile.bind(this);
    }

    componentDidMount(){
        ProfileService.getProfileById(this.state.customer_id).then( res => {
            this.setState({profile: res.data});
        })
    }

    addProfile(){
        this.props.history.push('/listprofile');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Profile Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>  Name: </label>
                            <div> { this.state.profile.name}</div>
                        </div>
                        <div className = "row">
                            <label> Address: </label>
                            <div> { this.state.profile.address}</div>
                        </div>
                        <div className = "row">
                            <label> Phone: </label>
                            <div> { this.state.profile.phone}</div>
                        </div>
                        <div className = "row">
                            <label>Email: </label>
                            <div> { this.state.profile.email }</div>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary" onClick={this.addProfile}>Back</button>
            </div>
        )
    }
}

export default ViewProfileComponent
