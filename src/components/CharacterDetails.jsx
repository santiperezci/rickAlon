import React from "react";

import "./styles.css";

const CharacterDetails = props => {
    const {image, name, gender, status } = props;

    return (
        <div className="CharacterDetails">
            <img className="CharacterDetailsImg" src={image} alt={name}/>
            <div className="Name" >{name}</div>
            <div>{gender}</div>
            <div>{status}</div>
        </div>
    )
}

export default CharacterDetails;