import tagtyles from "../styles/Tag.module.scss";
import { Dispatch, SetStateAction } from "react";
import Dot from "./Dot";

interface Filter {
  text: string;
  color: string;
  isActive: boolean;
}

interface LabelProps {
  text: string;
  color: string;
  isActive?: boolean;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}

const FilterTag = ({
  text,
  color,
  isActive = true,
  filters,
  setFilters,
}: LabelProps) => {
  return (
    <span
      className={isActive ? tagtyles.active : tagtyles.disabled}
      style={{ color: color }}
      onClick={(e) =>
        setFilters(
          filters.map((filter) => {
            return (e.target as HTMLSpanElement).innerText === filter.text
              ? {
                  text: filter.text,
                  color: filter.color,
                  isActive: !filter.isActive,
                }
              : filter;
          })
        )
      }
    >
      <Dot color={color}></Dot>
      {text}
    </span>
  );
};

export default FilterTag;
