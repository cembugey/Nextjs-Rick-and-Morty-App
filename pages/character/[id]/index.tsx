// import { server } from '../../../config'
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import MiniCharacterItem from "../../../components/MiniCharacterItem";
import LargeCharacterItem from "../../../components/LargeCharacterItem";
import charactersStyles from "../../../styles/Characters.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCharacter, getCharacters } from "rickmortyapi";
import { Character as CharacterType } from "rickmortyapi/dist/interfaces";

interface CharacterProps {
  character: CharacterType;
  otherCharacters: CharacterType[];
}

const Character = ({ character, otherCharacters }: CharacterProps) => {
  return (
    <div className={charactersStyles.wrapper}>
      <LargeCharacterItem character={character}></LargeCharacterItem>
      <div
        className={charactersStyles.title}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        Other Characters
      </div>
      {otherCharacters.map((char) => (
        <MiniCharacterItem key={char.id} character={char}></MiniCharacterItem>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const characterId = parseInt(context.params!.id as string);
  const res = await getCharacter(characterId);
  // console.log("res: ", res);
  const resAllCharacters = await getCharacters();

  const promiseArray = [];
  for (let i = 1; i <= resAllCharacters.data.info!.pages; i++) {
    promiseArray.push(getCharacters({ page: i }));
  }
  const otherCharacters: CharacterType[] = [];
  await Promise.all(promiseArray)
    .then((values) => {
      values.forEach((val) => {
        otherCharacters.push(
          ...(val.data.results?.filter((char) => char.id !== characterId) ?? [])
        );
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  // console.log("otherCharacters ", otherCharacters);
  return {
    props: {
      character: res.data,
      otherCharacters: otherCharacters,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getCharacters();

  const promiseArray = [];
  for (let i = 1; i <= res.data.info!.pages; i++) {
    promiseArray.push(getCharacters({ page: i }));
  }
  // Fetch all characters
  const allCharacters: CharacterType[] = [];
  await Promise.all(promiseArray)
    .then((values) => {
      values.forEach((val) => {
        allCharacters.push(...(val.data.results ?? []));
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  const paths = allCharacters.map((character) => ({
    params: { id: character.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Character;
