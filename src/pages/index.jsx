import React, { useEffect, useState } from "react";
import { makeApiRequest } from "../services/api";
import Loader from "../component/loader";
import { PaginationComponent } from "../component/pagination/PaginationComponent";
import CustomTable from "../component/table";
import { tableHeadData } from "../data/tableHeadData";
import { MdHourglassEmpty } from "react-icons/md";

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
            <td data-label="💰 Coin">{obj.name}</td>
            <td data-label="📄 Code ">{obj.symbol}</td>
            <td data-label="🤑 Price ">${obj.price_usd}</td>
            <td data-label="📉 Total Supply ">
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
        const res = await makeApiRequest({
          url: `https://disablecorsforcoin.vercel.app/api/tickers`,
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

        {loading ? (
          <Loader />
        ) : (
          <>
            {!coinData.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 0px",
                }}
              >
                <div className="w-20 h-20 bg-[#cccccc] rounded-full flex items-center justify-center">
                  <MdHourglassEmpty fontSize={30} />
                </div>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>
                  No cryptocurrency coin to display
                </p>
              </div>
            ) : (
              <>
                <div className="table-wrapper">
                  <CustomTable
                    TableHead={() => (
                      <CoinHeadItem tableHeadData={tableHeadData} />
                    )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
