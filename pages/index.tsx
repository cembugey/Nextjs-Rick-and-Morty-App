import LocationList from "../components/location/LocationList";
import Pagination from "../components/Pagination";
import { getLocations } from "rickmortyapi";
import { Location } from "rickmortyapi/dist/interfaces";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const getLocs = async () => {
      const res = await getLocations({ page: currentPage });
      setLocations(res.data.results ?? []);
      setNumberOfPages(res.data.info!.pages);
    };
    getLocs();
  }, [currentPage]);

  return (
    <>
      <LocationList locations={locations} />
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </>
  );
}
