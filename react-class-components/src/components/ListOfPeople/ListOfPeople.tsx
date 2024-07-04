import React, { Component } from "react";
import { Results } from "../../interface";

interface ListOfPeopleProps {
  result: Results[];
}

export default class ListOfPeople extends Component<ListOfPeopleProps> {
  render() {
    return (
      <div>
        {this.props.result.map((peopleItem) => (
          <p key={peopleItem.name}>{peopleItem.name}</p>
        ))}
      </div>
    );
  }
}
