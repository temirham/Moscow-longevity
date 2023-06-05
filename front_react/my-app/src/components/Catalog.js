import Card from './Card.js';
import Header from "./Header";
import {json, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useWindowSize} from "../hooks/useWindowSize";
import Navbar from "react-bootstrap/Navbar";
import Navig from "./Navig";
import BasicExample from "./Navig";
import {useDispatch} from "react-redux";
import {GetServices} from "../hooks/getServices";
import {delSumAction, useData, useServices, useSum} from "../slices/dataSlice";
import Drawer from "./Drawer";
import InputField from "./InputField";
import axios from "axios";
import { Col, Row, Spinner} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

const getServiceByName = async (name = "") =>{
    const res = await axios.get(`http://127.0.0.1:8000/search?search=${name}`)
    return res
}

const getServiceFilter = async (direction = "") =>{
    const res = await axios.get(`http://127.0.0.1:8000/filter?direction=${direction}`)
    return res
}


function Catalog() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false)
    GetServices()  // вызов хука
    const [services, setServices] = useState(useServices())
    const handleSearch = async () => {
        await setLoading(true);
        const results  = (await getServiceByName(searchValue)).data;
        await setServices(results);
        await setLoading(false)
    }

    const handleFilter = async (direction) => {
        const results  = (await getServiceFilter(direction)).data;
        await setServices(results);
    }

    return (
        <div className="wrapper clear">
            <Header />
            <BasicExample />
            <div className="BC mb-0">
                <p className="br_c"><Link className="BC_link" to="/">Главная</Link>
                    /<Link className="BC_link" to="/catalog">Каталог</Link></p>
            </div>
            <div className= "content p-30">
                <div className= "d-flex align-center justify-between mb-40">
                    <h1>Все услуги</h1>
                    <div className="d-flex align-center justify-between content">
                    <NavDropdown title="Сортировать:" id="basic-nav-dropdown" className="mr-20">
                        <NavDropdown.Item onClick={() => {
                            handleFilter("down")
                        }
                        }>
                            Сначала дорогие
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {
                            handleFilter("up")
                        }
                        }>Сначала дешевые</NavDropdown.Item>
                    </NavDropdown>
                    <InputField value={searchValue} setValue={setSearchValue} loading={loading} onSubmit={handleSearch} buttonTitle="Искать"/>
                    </div>
                </div>
                <div className= "d-flex">
                    {!services.length ? <h1>К сожалению, пока ничего не найдено :(</h1>:
                        <Row md={40} className="g-4">
                            {services.map((service, index) => {
                                return(
                                    <Col key={index}>
                                        <Card {...service}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </div>
            </div>
        </div>
    );
}

export default Catalog;
