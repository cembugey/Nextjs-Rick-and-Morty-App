import Image from "next/image";
import { Character } from "rickmortyapi/dist/interfaces";
import locationStyles from "../../styles/LocationCard.module.scss";

interface CharacterItemProps {
  character: Character;
}

const MiniCharacterItem = ({ character }: CharacterItemProps) => {
  return (
    <div style={{ display: "flex", height: "100px", width: "16rem" }}>
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          minWidth: "70px",
          height: "70px",
          marginRight: "10px",
        }}
      >
        <Image
          loader={() => character.image}
          src={character.image}
          alt={character.name}
          unoptimized={true}
          width={70}
          height={70}
        />
      </div>
      <div style={{ width: "14rem" }}>
        <h3 className={locationStyles.textContainer} style={{ width: "100%" }}>
          {character.name}
        </h3>
        <div className={locationStyles.textContainer}>
          {character.location.name}
        </div>
        <div className={locationStyles.textContainer}>
          {character.species} - {character.gender}
        </div>
      </div>
    </div>
  );
};

export default MiniCharacterItem;
