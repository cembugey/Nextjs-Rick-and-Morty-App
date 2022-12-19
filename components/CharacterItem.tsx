import Link from "next/link";
import Image from "next/image";
import { Character } from "rickmortyapi/dist/interfaces";
import Dot from "./Dot";

interface CharacterItemProps {
  character: Character;
}

const statusColorMap = { Alive: "green", Dead: "red", unknown: "grey" };

const CharacterItem = ({ character }: CharacterItemProps) => {
  return (
    <div>
      <div style={{ borderRadius: "20px", overflow: "hidden" }}>
        <Image
          loader={() => character.image}
          src={character.image}
          alt={character.name}
          unoptimized={true}
          width={200}
          height={200}
        />
      </div>
      <Link href={`/character/${character.id}`}>
        <h3 style={{ width: "100%" }}>{character.name}</h3>
      </Link>
      <div>
        <Dot color={statusColorMap[character.status]}></Dot>
        {character.status} - {character.species}
      </div>
    </div>
  );
};

export default CharacterItem;
