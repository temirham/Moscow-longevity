import {useEffect} from "react";
import axios from "axios"
import {setServicesAction} from "../slices/dataSlice";
import {useDispatch} from "react-redux";


export function GetServices() {
    const dispatch = useDispatch()
    async function fetchData() {
        const response = await axios.get('http://localhost:8000/services/') // получение данных с API
        dispatch(setServicesAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])
}

