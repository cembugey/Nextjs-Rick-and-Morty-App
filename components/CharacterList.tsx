import CharacterItem from "./CharacterItem";
import articleStyles from "../styles/Article.module.scss";
import { Character } from "rickmortyapi/dist/interfaces";

interface CharacterListProps {
  characters: Character[];
}

const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <div className={articleStyles.grid}>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
