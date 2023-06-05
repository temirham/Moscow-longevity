import {useEffect} from "react";
import axios from "axios"
import {useDispatch} from "react-redux";

import API from '../api';
import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";

export function DeleteService(id) {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0]
        }
    }
    axios.delete(`http://localhost:8000/services/${id}/`, config).then(r => console.log(r.data))
    return <Navigate to='/catalog'/>
}

