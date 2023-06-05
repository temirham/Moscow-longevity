import Header from "./Header";
import BasicExample from "./Navig";
import {useDispatch} from "react-redux";
import {useBookingService, useDraw, useService_id, useServices, useUser_id} from "../slices/dataSlice";
import {GetServiceByID} from "../hooks/getServiceByID";
import {Link} from "react-router-dom";
import CSRFToken from "./CSRFToken";
import {Card} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

function MyBooking(){
    const dispatch = useDispatch()
    const id = useUser_id()
    GetServiceByID(id)
    const BookingService = useBookingService()
    console.log(BookingService)
    return(
        <div className="wrapper clear ">
            <Header />
            <BasicExample />
            <CSRFToken/>
            <div className="BC clear">
                <p className="br_c"><Link className="BC_link" to="/catalog">Каталог</Link>
                    /<Link className="BC_link" to="/mybooking">Мои бронирования</Link></p>
            </div>
            {!Object.keys(BookingService).length ? <h5 className="ml-10 m-20"> Вы ничего не бронировали </h5>:
                <div className="d-flex align-center m-5">
                        <Card>
                            <img className="skrug mb-2" width={170} height={100} src={BookingService.service.img}/>
                            <div className= "d-flex flex-column">
                            <span>Название:</span>
                            <b>{BookingService.service.name}</b>
                            <span>Адресс:</span>
                            <b>{BookingService.service.address}</b>
                            <span>Цена:</span>
                            <b>{BookingService.service.price}</b>
                            <span>Статус Бронирования:</span>
                            <b>{BookingService.booking.status}</b>
                            <span>Дата бронирования:</span>
                            <b>{BookingService.booking.date_open}</b>
                            </div>
                        </Card>
                </div>
            }
        </div>

    )
}

export default MyBooking