import Link from "next/link";
import locationStyles from "../../styles/LocationCard.module.scss";
import { Location } from "rickmortyapi/dist/interfaces";

interface LocationItemProps {
  location: Location;
}

const LocationItem = ({ location }: LocationItemProps) => {
  return (
    <div className={locationStyles.card}>
      <Link href={`/characters/location/${location.id}`}>
        <h3 className={locationStyles.textContainer} style={{ width: "100%" }}>
          {location.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "40%" }}>
            <span>Type</span>
          </div>
          <div
            style={{ width: "60%" }}
            className={locationStyles.textContainer}
          >
            <span>{location.type}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "40%" }}>
            <span>Dimension</span>
          </div>
          <div
            style={{ width: "60%" }}
            className={locationStyles.textContainer}
          >
            <span>{location.dimension}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "40%" }}>
            <span>Resident count</span>
          </div>
          <div
            style={{ width: "60%" }}
            className={locationStyles.textContainer}
          >
            <span>{location.residents.length}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LocationItem;
