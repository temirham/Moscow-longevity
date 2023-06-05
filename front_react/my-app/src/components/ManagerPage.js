import Header from "./Header";
import BasicExample from "./Navig";
import {json, Link} from "react-router-dom";
import React, {useState} from "react";
import {Col, Row, Card} from "react-bootstrap";
import {useBooking} from "../slices/dataSlice";
import {ListBooking} from "../hooks/listBooking";
import NavDropdown from "react-bootstrap/NavDropdown";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";


const getBooking = async () =>{
    const options = {
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
    const res = await axios.get(`http://localhost:8000/bookings/`, options)
    return res
}

const getBookingFilter = async (status = "") =>{
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
    const res = await axios.get(`http://localhost:8000/bookingfilter?status=${status}`, config)
    return res
}

const getBookingDateFilter = async (start, end) =>{
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
    const res = await axios.get(`http://localhost:8000/bookingdatefilter?start=${start}&end=${end}`, config)
    return res
    // fetch(`http://localhost:8000/bookingdatefilter`, config)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // const res = await axios.post(`http://localhost:8000/bookingdatefilter`, config)
    // return res
}

const putBooking = async (booking, date, status) =>{
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: JSON.stringify({
            id: booking.id_field,
            service: booking.service,
            user: booking.user,
            status: status,
            date_open: booking.date_open,
            date_pay: date,
            // date_close: "2023-06-21",
        })
    }
    fetch(`http://localhost:8000/bookings/${booking.id_field}/`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function ManagerPage(){
    ListBooking()  // вызов хука
    const [booking, setBooking] = useState(useBooking())
    const [status, setStatus] = useState(booking.status)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const date = (new Date()).toISOString().slice(0,10);
    console.log(date)
    const handleSave = async (status, date, booking) => {
        await setStatus(status)
        await putBooking(booking, date, status)
        const results  = (await getBooking()).data;
        await setBooking(results);

    }
    const handleFilter = async (status) => {
        const results  = (await getBookingFilter(status)).data;
        await setBooking(results);
    }
    const getDates = async (start, end) => {
        start=document.getElementById("start_date").value;
        end=document.getElementById("end_date").value;
        // setStartDate(start.toString())
        // setEndDate(end.toString())
        const results = (await getBookingDateFilter(start.toString(),  end.toString())).data;
        console.log('start >',start, 'end >',end)
        await setBooking(results);
    }
    return(
        <div className="wrapper clear">
            <Header />
            <BasicExample />
            <CSRFToken/>
            <div className="BC mb-0 d-flex justify-between align-center">
                <p className="br_c"><Link className="BC_link" to="/">Главная </Link>
                    /<Link className="BC_link" to="/manage"> Страница Менеджера</Link></p>
                <div className="flex-column">
                    <NavDropdown title={"Сортировать по статусу"} id="basic-nav-dropdown" className="d-flex justify-between align-center">
                        <NavDropdown.Item onClick={() => handleFilter("в работе")}>
                            в работе
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("введен")}>
                            введен
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("оплачен")}>
                            оплачен
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("закрыт")}>
                            закрыт
                        </NavDropdown.Item>
                    </NavDropdown>
                    <div>Фильтр даты:</div>
                    <input className='mr-10' type='date' id='start_date'/>
                    <input className='mr-10' type='date' id='end_date'/>
                    <button className='mr-15' onClick={getDates}>Show</button>
                </div>
            </div>
            <div className= "d-flex ml-20 mb-20">
                {!booking.length ? <h1>К сожалению, пока ничего не найдено :(</h1>:
                    <Row xs={40} md={40} className="g-4">
                        {booking.map((booking, index) => {
                            return(
                                <Col key={index}>
                                    <div className= "d-flex flex-column">
                                        <span>Номер заказа:</span>
                                        <b>{booking.id_field}</b>
                                        <span>Статус:</span>
                                        <NavDropdown title={booking.status} id="basic-nav-dropdown">
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("в работе", date, booking)*/}
                                            {/*}} >в работе</NavDropdown.Item>*/}
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("оплачен", date, booking)*/}
                                            {/*}} >оплачен</NavDropdown.Item>*/}
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("закрыт", date, booking)*/}
                                            {/*}} >закрыт</NavDropdown.Item>*/}
                                            {(booking.status === "оплачен                       ") ? <NavDropdown.Item onClick={() => {
                                            handleSave("в работе", date, booking)
                                            }} >в работе</NavDropdown.Item> : <div></div>}
                                            {(booking.status === "оплачен                       ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("закрыт", date, booking)
                                            }} >закрыт</NavDropdown.Item> : <div></div>}
                                            {(booking.status === "закрыт                        ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("оплачен", date, booking)
                                            }} >оплачен</NavDropdown.Item> : <div></div>}
                                            {(booking.status === "в работе                      ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("оплачен", date, booking)
                                            }} >оплачен</NavDropdown.Item> : <div></div>}
                                            {(booking.status === "в работе                      ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("введен", date, booking)
                                            }} >введен</NavDropdown.Item> : <div></div>}
                                            {(booking.status === "введен                        ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("в работе", date, booking)
                                            }} >в работе</NavDropdown.Item> : <div></div>}
                                        </NavDropdown>
                                        <span>Дата открытия:</span>
                                        <b>{booking.date_open}</b>
                                        <span>Дата оплаты:</span>
                                        <b>{booking.date_pay}</b>
                                        <span>Номер пользователя:</span>
                                        <b>{booking.user}</b>
                                        <span>Номер услуги:</span>
                                        <b>{booking.service}</b>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    }
                </div>
        </div>
    );
}

export default ManagerPage