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
  componentDidMount(): void {
    this.fetchDataOfPeople();
  }

  fetchDataOfPeople = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people/?page=1");
      const data = await response.json();
      this.setState({ dataOfPeople: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  render() {
    return (
      <>
        <SearchBar />
        <ListOfPeople result={this.state.dataOfPeople.results as Results[]} />
      </>
    );
  }
}
