import FilterTag from "./FilterTag";
import { Dispatch, SetStateAction } from "react";

interface Filter {
  text: string;
  color: string;
  isActive: boolean;
}

interface FilterProps {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}

const Filter = ({ filters, setFilters }: FilterProps) => {
  return (
    <>
      <p>Filter by status:</p>
      <div style={{ display: "flex", gap: 10 }}>
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
    </>
  );
};

export default Filter;
