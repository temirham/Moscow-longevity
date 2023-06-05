import {json, Link} from "react-router-dom";
import {useParams} from "react-router";
import {GetServices} from "../hooks/getServices";
import {
    setDrawAction,
    setService_idAction,
    setSumAction, useIsAuthenticated, useIsStaff,
    useServices,
    useSum
} from "../slices/dataSlice";
import Button from "react-bootstrap/Button";
import React from "react";
import {useDispatch} from "react-redux";
import {useState} from "react";
import BasicExample from "./Navig";
import Header from "./Header";
import UpdateService from "./UpdateService";
import {DeleteService} from "../hooks/DeleteService";
import {useWindowSize} from "../hooks/useWindowSize";


function  Product(){
    const {id} = useParams();
    const size = useWindowSize()
    console.log(size)
    const dispatch = useDispatch()
    const isStaff = useIsStaff()
    GetServices()  // вызов хука
    const isAuthenticated= useIsAuthenticated()
    console.log(isAuthenticated)
    const services = useServices()
            return (
                <div className="wrapper clear">
                    <Header />
                    <BasicExample />
                    <div className="BC">
                        <p className="br_c"><Link className="BC_link" to="/catalog">Каталог</Link>
                            /<Link className="BC_link" to="/">{services[id - 1].name}</Link></p>
                    </div>
                    <h1 className="ml-20">{services[id - 1].name}</h1><br/>
                    <ul className="clear">
                        <li className="ml-20">Название: {services[id - 1].name}</li>
                        <li className="ml-20">Адрес: {services[id - 1].address}</li>
                        {!isAuthenticated ? <li className="ml-20">Чтобы записаться, пожалуйста, авторизуйтесь</li>: <li className="ml-20">
                                {!isStaff ?
                            <Button href={"/drawer"} onClick={ () => {
                                dispatch(setSumAction(services[id - 1].price))
                                dispatch(setDrawAction(services[id - 1]))
                                dispatch(setService_idAction(services[id - 1].id))
                            }}>Забронировать</Button> :
                                    <Button href={`/updateservice/${id}`} onClick={ () => {
                                    }}>Обновить</Button>
                                }
                            {!isStaff ? <div></div>:
                                <Button className="ml-10" onClick={ () => {
                                    DeleteService(services[id - 1].id)
                                }}>Удалить</Button>
                            }
                            </li>
                        }
                        <img className="wrapper align-center mb-40" width={size.width / 1.2} height={size.height / 2} src={services[id - 1].img} alt = "search"/>

                    </ul>

                </div>
            );
}

export default Product;
