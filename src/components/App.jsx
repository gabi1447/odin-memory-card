import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [gameState, setGameState] = useState({});
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    /* const currentScoreRef = useRef(currentScore); */

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

    // Populate pokemon data state
    useEffect(() => {
        getPokemonsData(pokeArray).then((pokemonsData) => {
            setPokemons(shuffle(pokemonsData));
        });
        // eslint-disable-next-line
    }, []);

    // Create initial game state
    useEffect(() => {
        resetGameState();
        // eslint-disable-next-line
    }, []);

    /* useEffect(() => {
        currentScoreRef.current = currentScore;
    }, [currentScore]); */

    function handleClick(pokemonId) {
        // Shuffle poke cards
        setPokemons(shuffle([...pokemons]));

        if (!gameState[pokemonId]) {
            const nextGameState = { ...gameState };
            nextGameState[pokemonId] = true;
            setGameState(nextGameState);
            setCurrentScore((prevCurrentScore) => {
                return prevCurrentScore + 1;
            });
        } else {
            if (currentScore > bestScore) {
                setBestScore(currentScore);
            }
            setCurrentScore(0);
            resetGameState();
        }
    }

    function resetGameState() {
        const initialGameState = {};
        pokeArray.forEach((pokemon) => {
            initialGameState[pokemon] = false;
        });
        setGameState(initialGameState);
    }

    return (
        <>
            <h1 className="gameHeading">Memory Card Game</h1>
            <div className="score">
                <h2>Current Score: {currentScore}</h2>
                <h2>Best Score: {bestScore}</h2>
            </div>
            <ul className="gameContainer">
                {pokemons.map((pokemonData) => (
                    <PokeCard
                        key={pokemonData.name}
                        name={pokemonData.name}
                        imgUrl={pokemonData.imgUrl}
                        onClick={handleClick}
                    />
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

export default App;
