import BasicExample from "./Navig";
import Header from "./Header";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import CSRFToken from "./CSRFToken";
import {register} from "../actions/auth";
import Cookies from "js-cookie";
import {setIsAuthenticatedAction, setIsStaffAction, setUser_idAction} from "../slices/dataSlice";
import {useDispatch} from "react-redux";

function Register({register, isAuthenticated}) {
    const [formData, setFormData] = useState({
        username:'',
        password:'',
        re_password:''
    });
    const [accountCreated, setAccountCreated] = useState(false);
    const dispatch = useDispatch

    const {username, password, re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    re_password: re_password
                })
            }
            fetch(`http://localhost:8000/accounts/register`, options)
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
        }
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
                <h1>Форма регистрации нового пользователя</h1>
                <p>Создайте учетную запись и получите доступ ко всем функциям</p>
                <form onSubmit={e => onSubmit(e)}>
                    <CSRFToken/>
                    <div className='form-group'>
                        <label className='form-label'>Придумайте никнейм:</label>
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
                        <label className='form-label mt-3'>Придумайте пароль:</label>
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
                    <div className='form-group'>
                        <label className='form-label mt-3'>Подтвердите пароль:</label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm Password*'
                            name='re_password'
                            onChange={e => onChange(e)}
                            value={re_password}
                            required
                        />
                    </div>
                    <button className='btn btn-primary mt-3' type='submit'>Зарегистрироваться</button>
                </form>
                <p className='mt-3'>
                    Если у вас есть аккаунт, <Link to='/login'>авторизуйтесь</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;