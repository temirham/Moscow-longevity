import {useEffect} from "react";
import axios from "axios"
import {useDispatch} from "react-redux";
import {setBookingAction} from "../slices/dataSlice";
import Cookies from "js-cookie";


export function ListBooking() {
    const dispatch = useDispatch()
    async function fetchData(){
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
        const response = await axios.get('http://localhost:8000/bookings/', config) // получение данных с API
            dispatch(setBookingAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])
}