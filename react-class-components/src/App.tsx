import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";

interface Data {
  count: number;
  next: string;
  previous: string | null;
  results: Results[];
}

interface Results {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: [];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface AppState {
  data: Data;
}
export default class App extends Component {
  state: Readonly<AppState> = {
    data: {
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
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  render() {
    return (
      <>
        <SearchBar />
        <ListOfPeople result={this.state.data}/>
      </>
    );
  }
}
