import {useDispatch} from "react-redux";
import axios, {options} from "axios";
import {setBookingServiceAction, setServicesAction} from "../slices/dataSlice";
import {useEffect} from "react";
import Cookies from "js-cookie";

export async function GetServiceByID(id){
    const dispatch = useDispatch()
    async function fetchData() {
        const response = await axios.get(`http://127.0.0.1:8000/bookingbyuser?user=${id}`)
        dispatch(setBookingServiceAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])

}