import dotStyles from "../styles/Dot.module.scss";

interface DotProps {
  color: string;
}

const Dot = ({ color }: DotProps) => {
  return (
    <span className={dotStyles.dot} style={{ backgroundColor: color }}></span>
  );
};

export default Dot;
