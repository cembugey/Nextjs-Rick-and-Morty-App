import LocationItem from "./LocationItem";
import locationStyles from "../styles/Location.module.scss";
import { Location } from "rickmortyapi/dist/interfaces";

interface LocationListProps {
  locations: Location[];
}

const LocationList = ({ locations }: LocationListProps) => {
  return (
    <div className={locationStyles.grid}>
      {locations.map((location) => (
        <LocationItem key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationList;
