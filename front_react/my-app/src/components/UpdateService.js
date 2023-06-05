import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {useServices} from "../slices/dataSlice";
import Header from "./Header";
import BasicExample from "./Navig";
import Cookies from "js-cookie";
import axios from "axios";
import {useParams} from "react-router";




export default function UpdateService(){
    const {id} = useParams();
    const service = useServices()[id - 1]
    const number = id
    console.log(service)
    const [formData, setFormData] = useState({
        name:'',
        address:'',
        img:'',
        price:'',
    });
    const {name, address, img, price} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();


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
        const body = JSON.stringify({name, address, img, price, number})
        axios.put(`http://localhost:8000/services/${service.id}/`, body, config).then(r => console.log(r.data))
        return <Navigate to='/catalog'/>
    }

    return (
        <div className='wrapper clear'>
            <Header/>
            <BasicExample/>
            <h1 className='content p-50'>Форма редактирования сервиса</h1>
            <form onSubmit={e => onSubmit(e)}>
                {/*<CSRFToken/>*/}
                <div className='form-group'>
                    <label className='form-label'>Название:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='название услуги'
                        name='name'
                        onChange={e => onChange(e)}
                        value={name}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Адресс:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='адресс услуги'
                        name='address'
                        onChange={e => onChange(e)}
                        value={address}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Цена:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='цена услуги'
                        name='price'
                        onChange={e => onChange(e)}
                        value={price}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Изображение:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='*вставьте в это поле ссылку на изображение'
                        name='img'
                        onChange={e => onChange(e)}
                        value={img}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Добавить</button>
            </form>
        </div>
    )
};
