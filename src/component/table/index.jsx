import React from "react";

const CustomTable = ({ tableStyles, TableHeadStyle, TableHead, Tablebody }) => {
  return (
    <div className="table-wrapper">
      <table className={tableStyles || "table-styles"}>
        <thead>
          <tr className={TableHeadStyle || "table-head-row"}>
            <TableHead />
          </tr>
        </thead>
        <tbody>
          <Tablebody />
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
