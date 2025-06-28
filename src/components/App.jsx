import { useState, useEffect } from "react";

function App() {
    const [pokemons, setPokemons] = useState([]);

    // prettier-ignore
    const pokeArray = [
        "swampert",
        "decidueye",
        "gallade",
        "typhlosion",
        "corviknight",
        "dragapult",
        "metagross",
        "infernape",
        "lugia",
        "luxray",
        "zacian",
        "hawlucha"
    ]

    useEffect(() => {
        getPokemonsData(pokeArray).then((pokemonsData) => {
            setPokemons(pokemonsData);
        });
        // eslint-disable-next-line
    }, []);

    console.log(pokemons);

    return (
        <>
            <h1 className="gameHeading">Memory Card Game</h1>
            <button
                onClick={() => {
                    setPokemons(shuffle(pokemons));
                }}
            >
                Shuffle
            </button>
            <ul className="gameContainer">
                {pokemons.map((pokemonData) => (
                    <li key={pokemonData.name} className="pokeCard">
                        <img
                            src={pokemonData.imgUrl}
                            className="pokeImg"
                            alt={pokemonData.name}
                        />
                        <p>
                            <b>{capitalizeWord(pokemonData.name)}</b>
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

function shuffle(array) {
    let randomizedArray = [];
    while (array.length !== 0) {
        // Randomize an index that's within the given arary length
        const randomIndex = Math.floor(Math.random() * array.length);

        // append number in randomized index to randomized array
        randomizedArray.push(array[randomIndex]);

        array.splice(randomIndex, 1);
    }

    return randomizedArray;
}

async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        const pokemonData = {
            name: data.name,
            imgUrl: data.sprites.front_default,
        };

        return pokemonData;
    } catch (error) {
        console.error(error.message);
    }
}

function getPokemonsData(pokeArray) {
    const promises = pokeArray.map((pokemon) => {
        return fetchPokemon(pokemon);
    });

    const arrayOfPokemonObjects = Promise.all(promises);

    return arrayOfPokemonObjects;
}

function capitalizeWord(word) {
    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.slice(1);
}

export default App;
