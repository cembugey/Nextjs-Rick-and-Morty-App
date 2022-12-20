import FilterTag from "./FilterTag";
import { Dispatch, SetStateAction } from "react";

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

interface FilterProps {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}

const Filter = ({ filters, setFilters }: FilterProps) => {
  return (
    <div>
      <p>Filter by status:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {filters.map((filter) => (
          <FilterTag
            key={filter.text}
            text={filter.text}
            color={filter.color}
            isActive={filter.isActive}
            filters={filters}
            setFilters={setFilters}
          ></FilterTag>
        ))}
      </div>
    </div>
  );
};

export default Filter;
