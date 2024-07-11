import React, { Dispatch, SetStateAction } from "react";
import { Results } from "../../interface";
import "./styles.css";
import { NavLink, useLocation } from "react-router-dom";

interface ListOfPeopleProps {
  result: Results[];
  loadingData: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function ListOfPeople({
  result,
  loadingData,
  page,
  setPage,
}: ListOfPeopleProps) {
  const location = useLocation();

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };
  return (
    <div className="list-characters-wrapper">
      {loadingData ? (
        <div className="loading-container">Loading data, please wait</div>
      ) : result && result.length ? (
        result.map((peopleItem) => (
          <NavLink
            to={`/people/${peopleItem.url.split("/")[5]}${location.search}`}
            key={peopleItem.name}
            className="person-wrapper"
          >
            <h3 className="person-name">{peopleItem.name}</h3>
          </NavLink>
        ))
      ) : (
        <h4 style={{ grid: "none", margin: "0 auto", display: "" }}>
          = Data Not Found =
        </h4>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <button disabled={page === 1} onClick={handlePreviousClick}>
          ←
        </button>
        <p>{page}</p>
        <button onClick={handleNextClick}>→</button>
      </div>
    </div>
  );
}
