import React from "react";
import styles from "./Pagination.module.css";
import { useEffect } from "react";

const Pagination = ({ dogsPerPage, dogs, currentPage, pagination }) => {
  const pageNumber = Math.ceil(dogs / dogsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      pagination(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumber) {
      pagination(currentPage + 1);
    }
  };
  useEffect(() => {
    //* Scroll cada vez que se aprete el boton de prev o next, con una transición smooth
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const goToFirstPage = () => {
    pagination(1);
  };

  const goToLastPage = () => {
    pagination(pageNumber);
  };

  return (
    <nav className={styles.Pagination}>
      <ul className={styles.PageNumbers}>
        <li>
          <button
            className={styles.PageNumber}
            type="button"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        <li>
          <button
            className={styles.PageNumber}
            type="button"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        <li>
          <span className={styles.PageInfo}>
            {currentPage} / {pageNumber}
          </span>
        </li>
        <li>
          <button
            className={styles.PageNumber}
            type="button"
            onClick={handleNextClick}
            disabled={currentPage === pageNumber}
          >
            Next
          </button>
        </li>
        <li>
          <button
            className={styles.PageNumber}
            type="button"
            onClick={goToLastPage}
            disabled={currentPage === pageNumber}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
