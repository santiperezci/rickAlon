import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./styles.css";

const CHARACTER_DETAILS = gql`
    query character($id: ID) {
        character( id: $id ) {
            image
            name
            gender
            status
        }
    }
`;

const Character = props => {
    const {image, name, characterId} = props;
    const context = useContext(AppContext);

    const { loading, error, data, refetch, networkStatus } = useQuery(CHARACTER_DETAILS, {
        variables: { id: characterId },
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>

    return (
        <div className="Character" onClick={() => context.characterData.set(data.character)}>
            <img className="CharacterImg" src={image} alt={name}/>
            <div>{name}</div>
        </div>
    )
}

export default Character;