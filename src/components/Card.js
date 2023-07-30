import React from 'react';
import trash from '../images/trash.svg';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    } 

    return (
        <li className="element">
            <img src={props.link} className="element__mask-group" onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__text">
                    {props.name}
                </h2>
                <div className="element__group">
                    <button className="element__group-button" type="button">
                    </button>
                    <p className="element__group-text">
                        {props.likes.length}
                    </p>
                </div>
            </div>
            <button className="element__trash-button" type="reset">
                <img src={trash} alt="удалить" className="element__trash-image" />
            </button>
        </li>
    );
}

export default Card;