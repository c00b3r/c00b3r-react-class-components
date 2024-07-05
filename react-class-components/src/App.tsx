import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";
import { AppState, Results } from "./interface";
export default class App extends Component {
  state: Readonly<AppState> = {
    dataOfPeople: {
      count: 0,
      next: "",
      previous: null,
      results: [],
    },
  };

  constructor(props: object) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    const searchParam = localStorage.getItem("prevSearchItem") || "";
    this.fetchDataOfPeople(searchParam);
  }

  fetchDataOfPeople = async (searchParam: string) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchParam}`,
      );
      const data = await response.json();
      this.setState({ dataOfPeople: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleSearch(searchParam: string): void {
    localStorage.setItem("prevSearchItem", searchParam);
    this.fetchDataOfPeople(searchParam);
  }

  render() {
    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <ListOfPeople result={this.state.dataOfPeople.results as Results[]} />
      </>
    );
  }
}
