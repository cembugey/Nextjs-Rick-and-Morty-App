// import { server } from '../../../config'
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../../components/Meta";
import { useState } from "react";
import CharacterItem from "../../../../components/CharacterItem";
import Filters from "../../../../components/Filters";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCharacters } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";

interface CharacterProps {
  characters: Character[];
}

interface Filter {
  text: string;
  color: string;
  isActive: boolean;
}

const DEFAULT_FILTERS = [
  {
    text: "Dead",
    color: "red",
    isActive: true,
  },
  {
    text: "Alive",
    color: "green",
    isActive: true,
  },
  {
    text: "Unknown",
    color: "grey",
    isActive: true,
  },
];

const Characters = ({ characters }: CharacterProps) => {
  const [filters, setFilters] = useState<Filter[]>(DEFAULT_FILTERS);
  const activeFilters = filters.reduce((acc, filter) => {
    if (filter.isActive) {
      return [...acc, filter.text.toLowerCase()];
    }
    return acc;
  }, [] as string[]);

  // const router = useRouter()
  // const { id } = router.query

  return (
    <div>
      {/* <Meta title="Characters" /> */}
      <Filters filters={filters} setFilters={setFilters}></Filters>
      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          marginTop: "3rem",
          marginBottom: "6rem",
        }}
      >
        {characters.reduce((acc, character) => {
          if (activeFilters.includes(character.status.toLowerCase())) {
            return [
              ...acc,
              <CharacterItem
                key={character.id}
                character={character}
              ></CharacterItem>,
            ];
          }
          return acc;
        }, [] as JSX.Element[])}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locationId = context.params!.id!.toString();
  const res = await getCharacters();

  const promiseArray = [];
  for (let i = 1; i <= res.data.info!.pages; i++) {
    promiseArray.push(getCharacters({ page: i }));
  }
  const allCharactersForSelectedLocation: Character[] = [];
  await Promise.all(promiseArray)
    .then((values) => {
      values.forEach((val) => {
        allCharactersForSelectedLocation.push(
          ...(val.data.results ?? []).filter(
            (char) =>
              char.location.url.split("location/").slice(-1)[0] === locationId
          )
        );
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  return {
    props: {
      characters: allCharactersForSelectedLocation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getCharacters();

  const ids = res.data.results!.map((character) => character.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default Characters;
