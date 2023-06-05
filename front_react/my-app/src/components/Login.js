import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {setIsAuthenticatedAction, setIsStaffAction, setUser_idAction} from "../slices/dataSlice";
import BasicExample from "./Navig";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";



const  Login = () => {

    const [formData, setFormData] = useState({
        username:'',
        password:''
    });
    const {username, password} = formData;
    const [IsAuthenticated, setIsAuthenticated] = useState(false)

    const dispatch = useDispatch()

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})


    const onSubmit = e => {
        e.preventDefault();
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
            // 'username':username,
            // 'password':password,
        }
        fetch(`http://localhost:8000/register`, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.IsAuthenticated);
                dispatch(setIsAuthenticatedAction(data.IsAuthenticated))
                dispatch(setUser_idAction(data.user_id))
                dispatch(setIsStaffAction(data.is_staff))
            })
            .catch(err => console.error(err));
        // axios.post('http://127.0.0.1:8000/register', options).then(r => console.log(r.data));
    }

    return (
        <div className='wrapper'>

            <header className="d-flex justify-between align-center p-35 clear">
                <div className="d-flex align-center">
                    <img width={100} height={100} src="/img/logo.png" />
                    <div>
                        <h3 className="text-uppercase">Московское долголетие</h3>
                        <p>Есть чем занять вас на пенсии</p>
                    </div>
                </div>
            </header>
            <BasicExample />
                <div className='content p-50'>
                <h1>Форма входа в аккаунт</h1>
                <p>Авторизуйтесь в системе, пожалуйста</p>
                <form onSubmit={e => onSubmit(e)}>
                    <CSRFToken/>
                    <div className='form-group'>
                        <label className='form-label'>Никнейм:</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Username*'
                            name='username'
                            onChange={e => onChange(e)}
                            value={username}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label mt-3'>Пароль:</label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Password*'
                            name='password'
                            onChange={e => onChange(e)}
                            value={password}
                            required
                        />
                    </div>
                    <Button className='btn btn-primary mt-3' onClick={onSubmit}>Войти</Button>
                </form>
                <p className='mt-3'>
                    Если у Вас нет учетной записи, <Link to='/register'>зарегистрируйтесь</Link>
                </p>
            </div>
        </div>
    );
};


export default Login;