import Image from "next/image";
import { Character } from "rickmortyapi/dist/interfaces";

interface CharacterItemProps {
  character: Character;
}

const MiniCharacterItem = ({ character }: CharacterItemProps) => {
  return (
    <div style={{ display: "flex", height: "100px", width: "18rem" }}>
      <div style={{ borderRadius: "10px", overflow: "hidden" }}>
        <Image
          loader={() => character.image}
          src={character.image}
          alt={character.name}
          unoptimized={true}
          width={70}
          height={70}
        />
      </div>
      <div>
        <h3 style={{ width: "100%" }}>{character.name}</h3>
        <div>{character.location.name}</div>
        <div>
          {character.species} - {character.gender}
        </div>
      </div>
    </div>
  );
};

export default MiniCharacterItem;
