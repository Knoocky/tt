import { Data } from "../../types/Data";
import GameCard from "../GameCard/GameCard";

interface Props {
    data: Array<Data>;
    isLoading: boolean;
}

function GameList({ data, isLoading }: Props) {
    return (
      <div className='List'>
        {!!data.length ? (
          data.map((item) => (
            <GameCard key={item.gameID} gameId={item.gameID} gameName={item.gameName} />
          ))
        ) : (
          <div>Ничего не найдено</div>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
    );
}

export default GameList;
