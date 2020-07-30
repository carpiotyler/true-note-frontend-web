import Axios from 'axios';

class Request {
    base = 'https://am3jjrqi13.execute-api.us-east-2.amazonaws.com/prod/';

    constructor(id_token, access_token) {
        this.id_token = id_token;
        this.access_token = access_token;
        this.config = {headers: {"Access-Control-Allow-Origin": "*"}};
    }

    async get(endpoint, config) {
        let res;
        try {
            res = await Axios.get(`${this.base}${endpoint}?id_token=${this.id_token}&access_token=${this.access_token}`, Object.assign({}, this.config, config));
            if(res.data.error === 'Not Authorized') {
                redirectSignIn();
            }
        } catch(err) {
            redirectSignIn();
        }
        return res;
    }
    
    async post(endpoint, body, config) {
        let res;
        try {
            res = await Axios.post(`${this.base}${endpoint}?id_token=${this.id_token}&access_token=${this.access_token}`, body, Object.assign({}, this.config, config))
            if(res.data.error === 'Not Authorized') {
                redirectSignIn();
            }
        } catch(err) {
            redirectSignIn();
        }
        return res;
    }
}

const redirectSignIn = function() {
    window.location.href = `https://true-note.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=o3k3uaehm25avnegda3jpqj10&redirect_uri=${window.location.origin}/app`;
}

export default Request;