import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";
// const response = await fetch("https://swapi.dev/api/people/?page=1");
export default class App extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <ListOfPeople />
      </>
    );
  }
}
