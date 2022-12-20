import paginationStyles from "../styles/Pagination.module.scss";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  numberOfPages = 7,
  currentPage = 1,
  setCurrentPage,
}: PaginationProps) => {
  const showPreviousPage = currentPage > 2;
  const showActivePage = currentPage > 1 && currentPage < numberOfPages;
  const showNextPage = currentPage < numberOfPages - 1;
  const showLastPage = numberOfPages > 1;
  return (
    <div className={paginationStyles.wrapper}>
      <ul className={paginationStyles.pagination}>
        <li>
          <span
            onClick={() => {
              if (currentPage <= 1) {
                return;
              }
              setCurrentPage(currentPage - 1);
            }}
          >
            «
          </span>
        </li>
        <li>
          <span
            className={currentPage === 1 ? paginationStyles.active : ""}
            onClick={() => setCurrentPage(1)}
          >
            1
          </span>
        </li>
        {currentPage > 3 && (
          <li>
            <span>&middot;&middot;&middot;</span>
          </li>
        )}
        {showPreviousPage && (
          <li>
            <span onClick={() => setCurrentPage(currentPage - 1)}>
              {currentPage - 1}
            </span>
          </li>
        )}
        {showActivePage && (
          <li>
            <span className={paginationStyles.active}>{currentPage}</span>
          </li>
        )}
        {showNextPage && (
          <li>
            <span onClick={() => setCurrentPage(currentPage + 1)}>
              {currentPage + 1}
            </span>
          </li>
        )}
        {currentPage < numberOfPages - 2 && (
          <li>
            <span>&middot;&middot;&middot;</span>
          </li>
        )}
        {showLastPage && (
          <li>
            <span
              className={
                currentPage === numberOfPages ? paginationStyles.active : ""
              }
              onClick={() => setCurrentPage(numberOfPages)}
            >
              {numberOfPages}
            </span>
          </li>
        )}
        <li>
          <span
            onClick={() => {
              if (currentPage >= numberOfPages) {
                return;
              }
              setCurrentPage(currentPage + 1);
            }}
          >
            »
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
