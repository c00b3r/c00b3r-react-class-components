import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";
import { Data, Results } from "./interface";

export default function App() {
  const [dataOfPeople, setDataOfPeople] = useState<Data>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataOfPeople = async (searchParam: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchParam}`,
      );
      const data = await response.json();
      if (data) {
        setDataOfPeople(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  function handleSearch(searchParam: string): void {
    const trimmedSearchParam = searchParam.trim();
    if (trimmedSearchParam === "") {
      localStorage.removeItem("prevSearchItem");
    } else {
      localStorage.setItem("prevSearchItem", trimmedSearchParam);
    }
    fetchDataOfPeople(trimmedSearchParam);
  }

  useEffect(() => {
    const searchParam = localStorage.getItem("prevSearchItem") || "";
    fetchDataOfPeople(searchParam);
  }, []);
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ListOfPeople
        result={dataOfPeople.results as Results[]}
        loadingData={loading}
      />
    </>
  );
}
