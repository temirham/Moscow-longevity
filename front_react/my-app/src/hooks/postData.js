import {useEffect} from "react";
import axios from "axios"
import {useDispatch} from "react-redux";

import API from '../api';

export async function postData(date_open, date_pay, date_close, status, service, user) {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0]
        },
        body: JSON.stringify({
            date_open: date_open,
            date_pay: date_pay,
            date_close: date_close,
            status: status,
            service: service,
            user: user,
        })
    };
    // fetch(`http://127.0.0.1:8000/accounts/logout`, options)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     // .then(response => console.log(response))
    //     .catch(err => console.error(err));
        const response = await axios.post(`http://127.0.0.1:8000/bookings/`, options)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
}

