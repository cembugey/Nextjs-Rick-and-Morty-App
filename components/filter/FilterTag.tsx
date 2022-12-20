import tagtyles from "../../styles/Tag.module.scss";
import { useState, Dispatch, SetStateAction } from "react";
import Dot from "../Dot";

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

interface LabelProps {
  text: string;
  color: Color;
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };
  const borderAndDotColor = isActive ? color.activeColor : color.passiveColor;

  const backgroundColor = isActive
    ? isHovered
      ? color.hoveredColor
      : "transparent"
    : "transparent";

  return (
    <span
      className={isActive ? tagtyles.active : tagtyles.disabled}
      style={{
        // color: borderAndDotColor,
        backgroundColor,
        borderColor: borderAndDotColor,
      }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
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
      <Dot color={borderAndDotColor}></Dot>
      {text}
    </span>
  );
};

export default FilterTag;
