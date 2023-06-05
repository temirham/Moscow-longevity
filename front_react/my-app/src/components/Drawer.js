import {delDrawAction, delSumAction, useDraw, useService_id, useSum, useUser_id} from "../slices/dataSlice";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {GetServices} from "../hooks/getServices";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import BasicExample from "./Navig";
import {Link} from "react-router-dom";
import Card from "./Card";
import Header from "./Header";
import {postData} from "../hooks/postData";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";

function Drawer(){
    const dispatch = useDispatch()
    // const [draw, setDraw] = useState(useDraw())
    const draw = useDraw()
    const service_id = useService_id()
    const date = (new Date()).toISOString().slice(0,10);
    console.log({"service" : service_id})
    const user_id = useUser_id()
    console.log({"user" : user_id})
    console.log(draw)
    GetServices()  // вызов хука
    const sum = useSum()
    return(
        <div className="wrapper">
            <Header />
            <BasicExample />
            {/*<CSRFToken/>*/}
            <div className="BC clear">
                <p className="br_c"><Link className="BC_link" to="/catalog">Каталог</Link>
                    /<Link className="BC_link" to="/drawer">Корзина</Link></p>
            </div>
            <div className="content p-15">
            <h1 className="ml-10">Корзина</h1>
            <div className="large mt-10 ml-10"> Сумма заказа: { sum }</div>
                {!Object.keys(draw).length ? <h5 className="ml-10"> Корзина Пуста... </h5>:
                <div className="ml-40 mb-10">
                    <div className="d-flex align-center mt-5">
                        <img className="skrug" width={200} height={150} src={draw.img}/>
                            <div className= "d-flex flex-column align-center ml-10">
                                <span>Название:</span>
                                <b>{draw.name}</b>
                                <span>Адресс:</span>
                                <b>{draw.address}</b>
                                <span>Цена:</span>
                                <b>{draw.price}</b>
                            </div>
                    </div>
                <Button className="mt-30" onClick={() => {
                    dispatch(delSumAction())
                    dispatch(delDrawAction())
                }
                } as="a" variant="success">
                    Обнулить
                </Button>
                    <Button className="mt-30 ml-10" onClick={() => {
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
                                id: 1,
                                service: service_id,
                                user: user_id,
                                status: "введен",
                                date_open: date,
                                // date_pay: ,
                                // date_close: "2023-06-21",
                            })
                        }
                        console.log(document.cookie
                            .split('; ')
                            .filter(row => row.startsWith('csrftoken='))
                            .map(c => c.split('=')[1])[0])
                        fetch(`http://localhost:8000/bookings/`, options)
                            .then(response => response.json())
                            .then(response => {!(response.user.toString() === "booking с таким user уже существует.") ? alert("Поздравляю вы записались") : alert("Вы не можете записаться на два и более мероприятия")})
                            .catch(err => console.error(err));
                    }
                    } as="a" variant="success">
                        Заказать
                    </Button>
                </div>
                }
            </div>
        </div>
    );
 }

 export default Drawer;