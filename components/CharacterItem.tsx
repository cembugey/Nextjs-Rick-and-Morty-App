import Link from "next/link";
import Image from "next/image";
import { Character } from "rickmortyapi/dist/interfaces";
import locationStyles from "../styles/LocationCard.module.scss";
import Dot from "./Dot";

interface CharacterItemProps {
  character: Character;
}

const statusColorMap = { Alive: "green", Dead: "red", unknown: "grey" };

const CharacterItem = ({ character }: CharacterItemProps) => {
  return (
    <div style={{ width: "200px" }}>
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          width: "200px",
          height: "200px",
        }}
      >
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
        <h3 className={locationStyles.textContainer} style={{ width: "100%" }}>
          {character.name}
        </h3>
      </Link>
      <div className={locationStyles.textContainer}>
        <Dot color={statusColorMap[character.status]}></Dot>
        {character.status} - {character.species}
      </div>
    </div>
  );
};

export default CharacterItem;
