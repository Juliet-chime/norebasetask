import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const PaginationComponent = ({
  isFirstPage,
  isLastPage,
  goOnNextPage,
  goOnPrevPage,
  currentPageNumber,
  totalPageNo,
}) => {
  return (
    <div className="btn-container" style={{ justifyContent: "space-between" }}>
      <div>
        {!isFirstPage ? (
          <button onClick={goOnPrevPage}>
            <FaArrowLeft /> Previous
          </button>
        ) : null}
      </div>
      <div>
        {" "}
        <p>
          {currentPageNumber}/{totalPageNo}
        </p>
      </div>
      <div>
        {!isLastPage ? (
          <button onClick={goOnNextPage}>
            Next <FaArrowRight />
          </button>
        ) : null}
      </div>
    </div>
  );
};
