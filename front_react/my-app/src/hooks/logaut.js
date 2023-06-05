
import React from "react";
import Cookies from "js-cookie";

export async function logout() {
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
    };
    fetch(`http://localhost:8000/accounts/logout`, options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        // .then(response => console.log(response))
        .catch(err => console.error(err));
}

