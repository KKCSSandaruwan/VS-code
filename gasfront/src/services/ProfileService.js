import axios from 'axios';

const Profile_API_BASE_URL = "http://localhost:8090/api/v1/profile";

class ProfileService {

    getProfile(){
        return axios.get(Profile_API_BASE_URL);
    }

    createProfile(profile){
        return axios.post(Profile_API_BASE_URL, profile);
    }

    getProfileById(customerId){
        return axios.get(Profile_API_BASE_URL + '/' + customerId);
    }

    updateProfile(profile, customerId){
        return axios.put(Profile_API_BASE_URL + '/' + customerId,profile);
    }

    deleteProfile(customerId){
        return axios.delete(Profile_API_BASE_URL + '/' + customerId);
    }
}

export default new ProfileService()