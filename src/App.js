import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Right from "./components/Right";
import Body from "./components/Body";
import "./components/styles.css";

const httpLink = new HttpLink ({
  uri: "https://rickandmortyapi.com/graphql/",
});

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link : httpLink,
});

function App() {
  const [characterId, setCharacterId] = useState(null);
  const [charactersData, setCharactersData] = useState(null);
  const [characterData, setCharacterData] = useState(null);

  const contextData = {
    characterId: { get: characterId, set: setCharacterId },
    charactersData: { get: charactersData, set: setCharactersData },
    characterData: { get: characterData, set: setCharacterData }
  }

  return (
    <AppContext.Provider value={contextData}>
      <ApolloProvider client={client}>
        <div className="App">
          <Body />
          <Right />
        </div>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
