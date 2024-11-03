import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const PaginationComponent = ({
  isFirstPage,
  goOnNextPage,
  goOnPrevPage,
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
        <button onClick={goOnNextPage}>
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
