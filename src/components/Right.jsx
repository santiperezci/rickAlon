import React, { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import CharacterDetails from "./CharacterDetails";
import "./styles.css";

const SEARCH_QUERY = gql`
    query characters($name: String!) {
        characters( filter: {name: $name} ) {
            results {
                id
                image
                name
            }
        }
    }
`;

const ALL_CHARACTERS_QUERY = gql`
    query characters {
        characters {
            results {
                id
                image
                name
            }
        }
    }
`;

const STATUS_QUERY = gql`
    query characters($status: String!) {
        characters( filter: {status: $status} ) {
            results {
                id
                image
                name
            }
        }
    }
`;

const Right = () => {
    const context = useContext(AppContext);

    const [name, setName] = useState(null);
    const [search, setSearch] = useState(null);
    const [status, setStatus] = useState(2);
    const [queryMode, setQueryMode] = useState(0);

    const searchHandler = event => {
        setName(event.target.value);
    }

    let statusAux;
    let query;
    if (queryMode === 0) {
        if (status === 0) {
            statusAux = "alive";
            query = STATUS_QUERY;
        } else if (status === 1) {
            statusAux = "dead";
            query = STATUS_QUERY;
        } else {
            statusAux = "";
            query = ALL_CHARACTERS_QUERY;
        }
    } else {
        query = SEARCH_QUERY;
    }

    const { loading, error, data, refetch, networkStatus } = useQuery(query, {
        variables: { name: search, status: statusAux },
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error && search) return <div>Error</div>

    if (data) {
        context.charactersData.set(data.characters.results);
    }

    return (
        <div className="Right">
            <div className="StatusButtons">
                <div className={status === 0 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(0); setQueryMode(0)}}>Alive</div>
                <div className={status === 1 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(1); setQueryMode(0)}}>Dead</div>
                <div className={status === 2 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(2); setQueryMode(0)}}>All</div>
            </div>

            <div className="SearchBar">
                <input className="Search" placeholder="Search a character" onChange={searchHandler}/>
                <div className="MagnifyingGlass" onClick={() => {setSearch(name); setQueryMode(1)}}>🔍</div>
            </div>
            {context.characterData.get ? <CharacterDetails image={context.characterData.get.image} name={context.characterData.get.name}
                                gender={context.characterData.get.gender} status={context.characterData.get.status} key={context.characterData.get.id}/> : null}
        </div>
    )
}

export default Right;