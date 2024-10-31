import React, { useEffect, useState } from "react";
import { makeRequest } from "../services/api";
import Loader from "../component/loader";
import { PaginationComponent } from "../component/pagination/PaginationComponent";
import CustomTable from "../component/table";
import { tableHeadData } from "../data/tableHeadData";

const CoinHeadItem = ({ tableHeadData }) => {
  return (
    <>
      {tableHeadData.map((data, key) => {
        return (
          <th key={key}>
            <div className="table-head-col">
              <p>{data.icon}</p>
              <p>{data.label}</p>
            </div>
          </th>
        );
      })}
    </>
  );
};

const CoinBodyItem = ({ data }) => {
  return (
    <>
      {data.map((obj) => {
        return (
          <tr key={obj.name}>
            <td>{obj.name}</td>
            <td>{obj.symbol}</td>
            <td>${obj.price_usd}</td>
            <td>
              {obj.tsupply}
              {obj.symbol}
            </td>
          </tr>
        );
      })}
    </>
  );
};

const HomePage = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);
  const TOTAL_VALUES_PER_PAGE = 10;

  const totalPageNo = coinData.length / TOTAL_VALUES_PER_PAGE;
  const isLastPage =
    currentPageNumber === coinData.length / TOTAL_VALUES_PER_PAGE;
  const isFirstPage = currentPageNumber === 1;

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    if (currentPageNumber === totalPageNo) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    async function getcoinData() {
      try {
        setLoading(true);
        const res = await makeRequest({
          url: `tickers/`,
        });
        setCoinData(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getcoinData();
  }, []);

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(coinData.slice(start, end));
  }, [currentPageNumber, coinData]);

  return (
    <div className="container">
      <div className="item-wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                margin: "20px 0px",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Cryptocurrency Coins
            </h1>
            <div className="table-wrapper">
              <CustomTable
                TableHead={() => <CoinHeadItem tableHeadData={tableHeadData} />}
                Tablebody={() => <CoinBodyItem data={dataToDisplay} />}
              />
            </div>
            <PaginationComponent
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              goOnNextPage={goOnNextPage}
              goOnPrevPage={goOnPrevPage}
              currentPageNumber={currentPageNumber}
              totalPageNo={totalPageNo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
