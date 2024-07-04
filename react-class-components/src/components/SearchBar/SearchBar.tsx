import React, { Component } from "react";
import "./styles.css";

export default class SearchBar extends Component {
  state: Readonly<{ valueInput: string }> = {
    valueInput: localStorage.getItem("prevSearchItem") ?? "",
  };

  constructor(props: string) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ valueInput: event.target?.value });
  }

  handleClick() {
    if (this.state.valueInput) {
      localStorage.setItem("prevSearchItem", this.state.valueInput);
    }
    this.setState({ valueInput: "" });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.valueInput}
          onChange={(event) => this.handleChange(event)}
        />
        <button onClick={this.handleClick}>Seatch</button>
      </div>
    );
  }
}
