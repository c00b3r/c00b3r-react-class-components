import React, { Component } from "react";
import "./styles.css";

interface SearchBarProps {
  onSearch: (searchParam: string) => void;
}

export default class SearchBar extends Component<SearchBarProps> {
  state: Readonly<{ valueInput: string }> = {
    valueInput: localStorage.getItem("prevSearchItem") ?? "",
  };

  constructor(props: SearchBarProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ valueInput: event.target?.value });
  }

  handleClick() {
    this.props.onSearch(this.state.valueInput);

    this.setState({ valueInput: "" });
  }

  render() {
    return (
      <div className="search-wrapper">
        <input
          type="text"
          value={this.state.valueInput}
          onChange={(event) => this.handleChange(event)}
        />
        <button onClick={this.handleClick}>Search People</button>
      </div>
    );
  }
}
