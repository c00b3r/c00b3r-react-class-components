import React, { Component } from "react";
import { Results } from "../../interface";
import "./styles.css";

interface ListOfPeopleProps {
  result: Results[];
}

export default class ListOfPeople extends Component<ListOfPeopleProps> {
  render() {
    return (
      <div className="list-characters-wrapper">
        {this.props.result.map((peopleItem) => (
          <div key={peopleItem.name} className="person-wrapper">
            <h3 className="person-name">{peopleItem.name}</h3>
            <p className="person-birthday">
              Birh Date:{" "}
              <span style={{ fontWeight: "bold" }}>
                {peopleItem.birth_year}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  }
}
