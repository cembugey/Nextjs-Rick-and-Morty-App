import Link from "next/link";
import locationStyles from "../styles/Location.module.scss";
import { Location } from "rickmortyapi/dist/interfaces";

interface LocationItemProps {
  location: Location;
}

const LocationItem = ({ location }: LocationItemProps) => {
  return (
    <Link href={`/characters/location/${location.id}`}>
      <div className={locationStyles.card}>
        <h3 style={{ width: "100%" }}>{location.name}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "40%" }}>
            <span>Type</span>
          </div>
          <div
            style={{ width: "60%" }}
            className={locationStyles.textContainer}
          >
            <span className={locationStyles.cardText}>{location.type}</span>
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
            <span className={locationStyles.cardText}>
              {location.dimension}
            </span>
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
            <span className={locationStyles.cardText}>
              {location.residents.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationItem;