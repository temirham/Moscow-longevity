import React from 'react'
import {delSumAction, setSumAction, useData, useSum} from "../slices/dataSlice";
import {useDispatch} from "react-redux";
import {GetServices} from "../hooks/getServices";

export default function ShoppingCart(){
    const dispatch = useDispatch()
    GetServices()  // вызов хука
    const sum = useSum()
    const data = useData()
    return(
        <div >
            <div className="large"> Сумма заказа: { sum }</div>
            {
                data.map((good) =>
                    <div key={good.id}>
                        <p>
                            { good.name }
                        </p>
                        <p> Цена -
                            { good.price }
                        </p>
                        <button onClick={ () => {
                            dispatch(setSumAction( good.price ))
                        }}>
                            Добавить
                        </button>
                    </div>
                )
            }
            <button onClick={() => {
                dispatch(delSumAction())
            }
            }>
                Обнулить
            </button>
        </div>
    )
}