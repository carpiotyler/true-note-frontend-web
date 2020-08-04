import {createContext} from 'react';

export default createContext({
    id_token: null,
    access_token: null,
    user_data: {}
});