import Axios from 'axios';

class Request {
    base = 'https://am3jjrqi13.execute-api.us-east-2.amazonaws.com/prod/';

    constructor(id_token, access_token) {
        this.id_token = id_token;
        this.access_token = access_token;
        this.config = {headers: {"Access-Control-Allow-Origin": "*"}};
    }

    get(endpoint, config) {
        return Axios.get(`${this.base}${endpoint}?id_token=${this.id_token}&access_token=${this.access_token}`, Object.assign({}, this.config, config));
    }
    
    post(endpoint, body, config) {
        return Axios.post(`${this.base}${endpoint}?id_token=${this.id_token}&access_token=${this.access_token}`, body, Object.assign({}, this.config, config))
    }
}

export default Request;