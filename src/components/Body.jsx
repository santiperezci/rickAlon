import React, { useContext } from "react";
import AppContext from "../AppContext";

import Character from "./Character";
import "./styles.css";

const Body = () => {
    const context = useContext(AppContext);

    let characters;
    if (context.charactersData.get) {
        characters = context.charactersData.get.map(obj => {
            return <Character image={obj.image} name={obj.name} characterId={obj.id} key={obj.id}/>
        })
    }

    return (
        <div className="Body">
            {characters}
        </div>
    )
}

export default Body;