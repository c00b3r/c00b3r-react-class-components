import React, { useEffect, useState } from "react";
import { Data } from "../../interface";
import useLocalStorage from "../../hooks/useLocalStorage";
import fetchDataOfPeopleApi from "../../service/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import "./MainPage.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getDataOfPeople = async (searchParam: string, page: number) => {
    setLoading(true);
    try {
      const data: Data = await fetchDataOfPeopleApi(searchParam, page);
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
      setSearchParams({});
    } else {
      setLocalStorageItem(trimmedSearchParam);
      setSearchParams({ search: trimmedSearchParam, page: "1" });
    }
    getDataOfPeople(trimmedSearchParam, 1);
  }

  useEffect(() => {
    const searchParam = searchParams.get("search") || localStorageItem;
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    getDataOfPeople(searchParam, pageParam);
  }, [localStorageItem, searchParams]);

  return (
    <div className="main-wrapper">
      <SearchBar
        onSearch={handleSearch}
        updateLocalStorageItem={setLocalStorageItem}
      />
      <main>
        <ListOfPeople
          data={dataOfPeople as Data}
          loadingData={loading}
          page={parseInt(searchParams.get("page") || "1", 10)}
          setPage={(page) => {
            setSearchParams({
              search: localStorageItem,
              page: page.toString(),
            });
            navigate(`/?search=${localStorageItem}&page=${page}`);
          }}
        />
        <Outlet />
      </main>
    </div>
  );
}
