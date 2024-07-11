import React, { useEffect, useState } from "react";
import { Data, Results } from "../../interface";
import useLocalStorage from "../../hooks/useLocalStorage";
import fetchDataOfPeopleApi from "../../service/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import "./MainPage.css";
import { Outlet } from "react-router-dom";

export default function MainPage() {
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
    <div className="main-wrapper">
      <SearchBar onSearch={handleSearch} />
      <main>
        <ListOfPeople
          result={dataOfPeople.results as Results[]}
          loadingData={loading}
        />
        <Outlet />
      </main>
    </div>
  );
}
