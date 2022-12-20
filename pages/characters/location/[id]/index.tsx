import { useState, useEffect, useMemo } from "react";
import CharacterItem from "../../../../components/character/CharacterItem";
import Filters from "../../../../components/filter/Filters";
import Pagination from "../../../../components/Pagination";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCharacters, getLocations, getLocation } from "rickmortyapi";
import { Character, Location } from "rickmortyapi/dist/interfaces";
import charactersStyles from "../../../../styles/Characters.module.scss";

interface CharacterProps {
  characters: Character[];
}

interface Color {
  activeColor: string;
  hoveredColor: string;
  pressedColor: string;
  passiveColor: string;
}

interface Filter {
  text: string;
  color: Color;
  isActive: boolean;
}

const NUMBER_OF_ITEMS_PER_PAGE = 20;

const DEFAULT_FILTERS = [
  {
    text: "Dead",
    color: {
      activeColor: "#ad150a",
      hoveredColor: "#c28f8c",
      pressedColor: "#9e4a46",
      passiveColor: "#d19f9d",
    },
    isActive: true,
  },
  {
    text: "Alive",
    color: {
      activeColor: "#81ba5b",
      hoveredColor: "#bddea9",
      pressedColor: "#87ad6f",
      passiveColor: "#c6deb8",
    },
    isActive: true,
  },
  {
    text: "Unknown",
    color: {
      activeColor: "#8b8c89",
      hoveredColor: "#cccfc8",
      pressedColor: "#afb3ab",
      passiveColor: "#d5d6d4",
    },
    isActive: true,
  },
];

const Characters = ({ characters }: CharacterProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(
    Math.ceil(characters.length / NUMBER_OF_ITEMS_PER_PAGE)
  );

  const [filters, setFilters] = useState<Filter[]>(DEFAULT_FILTERS);
  const activeFilters = filters.reduce((acc, filter) => {
    if (filter.isActive) {
      return [...acc, filter.text.toLowerCase()];
    }
    return acc;
  }, [] as string[]);

  const filteredCharacters = useMemo(() => {
    return characters.reduce((acc, character) => {
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
    }, [] as JSX.Element[]);
  }, [characters, activeFilters]);

  const charactersToDisplay = filteredCharacters.slice(
    NUMBER_OF_ITEMS_PER_PAGE * (currentPage - 1),
    NUMBER_OF_ITEMS_PER_PAGE * currentPage
  );

  useEffect(() => {
    setNumberOfPages(
      Math.ceil(filteredCharacters.length / NUMBER_OF_ITEMS_PER_PAGE)
    );
  }, [filteredCharacters]);

  return (
    <div>
      {/* <Meta title="Characters" /> */}
      <Filters filters={filters} setFilters={setFilters}></Filters>
      <div className={charactersStyles.characterList}>
        {charactersToDisplay}
      </div>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locationId = context.params!.id!;
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
  const res = await getLocations();

  const promiseArray = [];
  for (let i = 1; i <= res.data.info!.pages; i++) {
    promiseArray.push(getLocations({ page: i }));
  }
  // Fetch all locations
  const allLocations: Location[] = [];
  await Promise.all(promiseArray)
    .then((values) => {
      values.forEach((val) => {
        allLocations.push(...(val.data.results ?? []));
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  const paths = allLocations.map((location) => ({
    params: { id: location.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Characters;
