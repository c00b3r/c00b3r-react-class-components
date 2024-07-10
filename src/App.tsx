import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";
import { Data, Results } from "./interface";
import useLocalStorage from "./hooks/useLocalStorage";
import fetchDataOfPeopleApi from "./service/api";

export default function App() {
  const [dataOfPeople, setDataOfPeople] = useState<Data>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [localStorageItem, setLocalStorageItem] =
    useLocalStorage("prevSearchItem");

  const getDataOfPeople = async (searchParam: string) => {
    setLoading(true);
    try {
      const data: Data = await fetchDataOfPeopleApi(searchParam);
      console.log(data);
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
      setLocalStorageItem(trimmedSearchParam);
    }
    getDataOfPeople(trimmedSearchParam);
  }

  useEffect(() => {
    getDataOfPeople(localStorageItem);
  }, [localStorageItem]);

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
