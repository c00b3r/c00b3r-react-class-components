import React from "react";
import { Results } from "../../interface";
import "./styles.css";

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
      ) : (
        result.map((peopleItem) => (
          <div key={peopleItem.name} className="person-wrapper">
            <h3 className="person-name">{peopleItem.name}</h3>
            <p className="person-birthday">
              Birh Date:{" "}
              <span style={{ fontWeight: "bold" }}>
                {peopleItem.birth_year}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
