interface GameCardProps {
    gameId: string,
    gameName: string,
}

function GameCard(props: GameCardProps) {
    const {gameId, gameName} = props;

    return (
        <div>
            <img src={`https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${gameId}.png`} alt={gameName}/>
            <p>{gameName}</p>
        </div>
    )
}

export default GameCard;
