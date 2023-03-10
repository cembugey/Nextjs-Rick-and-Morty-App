import Link from "next/link";
import Image from "next/image";
import { Character } from "rickmortyapi/dist/interfaces";
import charactersStyles from "../../styles/Characters.module.scss";
import Dot from "../Dot";

interface CharacterItemProps {
  character: Character;
}

const statusColorMap = {
  Alive: "#81ba5b",
  Dead: "#ad150a",
  unknown: "#8b8c89",
};

const LargeCharacterItem = ({ character }: CharacterItemProps) => {
  return (
    <div
      className={charactersStyles.characterDetail}
      style={{ borderRadius: "20px", overflow: "hidden", width: "300px" }}
    >
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          width: "300px",
          height: "300px",
        }}
      >
        <Image
          loader={() => character.image}
          src={character.image}
          alt={character.name}
          priority
          unoptimized={true}
          width={300}
          height={300}
        />
      </div>
      <h3 style={{ width: "100%" }}>{character.name}</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Dot color={statusColorMap[character.status]}></Dot>
          {character.status} - {character.species}
        </div>
        <p style={{ fontStyle: "italic", color: "grey", margin: 0 }}>
          {character.type ? `${character.type} - ` : ""}
          {character.gender}
        </p>
      </div>
      <p>{character.location.name}</p>
    </div>
  );
};

export default LargeCharacterItem;
