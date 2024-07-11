import React from "react";
import { Results } from "../../interface";
import "./styles.css";
import { NavLink } from "react-router-dom";

interface ListOfPeopleProps {
  result: Results[];
  loadingData: boolean;
}

export default function ListOfPeople({
  result,
  loadingData,
}: ListOfPeopleProps) {
  return (
    <div className="list-characters-wrapper">
      {loadingData ? (
        <div className="loading-container">Loading data, please wait</div>
      ) : result && result.length ? (
        result.map((peopleItem) => (
          <NavLink
            to={`/people/${peopleItem.url.split("/")[5]}`}
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
    </div>
  );
}
