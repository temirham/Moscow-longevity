import React from 'react';
import {Link} from "react-router-dom";

function Card(props){
    const [isAdded, setIsAdded] = React.useState(false);

    const onClickCard = () => {
        setIsAdded(true);

    };

    return (
        <Link to={`/product/${props.number}`}>
            <div className="card" onClick={onClickCard}>
            <img className="skrug" width={160} height={112} src={props.img}/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className= "d-flex flex-column">
                    <span>Название:</span>
                    <b>{props.name}</b>
                    <span>Адресс:</span>
                    <b>{props.address}</b>
                    <span>Цена:</span>
                    <b>{props.price}</b>
                </div>
                <img width={30} height={30} src={isAdded ? "/img/icons8-plus-key-50-2.png" : "/img/icons8-plus-key-50.png"}/>
            </div>
        </div>
        </Link>
    );
}

export default Card;