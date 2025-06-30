function PokeCard({ name, imgUrl, onClick }) {
    return (
        <li
            className="pokeCard"
            id={name}
            onClick={() => {
                onClick(name);
            }}
        >
            <img src={imgUrl} className="pokeImg" alt={name} />
            <p>
                <b>{capitalizeWord(name)}</b>
            </p>
        </li>
    );
}

function capitalizeWord(word) {
    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.slice(1);
}

export default PokeCard;
