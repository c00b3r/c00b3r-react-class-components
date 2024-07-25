import { useEffect, useState } from "react";
import { Data } from "../../interface";
import useLocalStorage from "../../hooks/useLocalStorage";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import "./MainPage.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { starWarsApi } from "../../store/thunks/starWarsApi";

export default function MainPage() {
  const [dataOfPeople, setDataOfPeople] = useState<Data | undefined>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });
  const [localStorageItem, setLocalStorageItem] =
    useLocalStorage("prevSearchItem");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading } = starWarsApi.useGetAllPeopleQuery({
    searchParam: searchParams.get("search") || localStorageItem,
    page: parseInt(searchParams.get("page") || "1", 10),
  });

  function handleSearch(searchParam: string): void {
    const trimmedSearchParam = searchParam.trim();
    if (trimmedSearchParam === "") {
      localStorage.removeItem("prevSearchItem");
      setSearchParams({});
    } else {
      setLocalStorageItem(trimmedSearchParam);
      setSearchParams({ search: trimmedSearchParam, page: "1" });
    }
  }

  useEffect(() => {
    if (data) {
      setDataOfPeople(data);
    }
  }, [data]);

  return (
    <div className="main-wrapper">
      <SearchBar
        onSearch={handleSearch}
        updateLocalStorageItem={setLocalStorageItem}
      />
      {isLoading ? (
        <h3 className="loading-container">Loading data, please wait</h3>
      ) : (
        <main>
          <ListOfPeople
            data={dataOfPeople as Data}
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
      )}
    </div>
  );
}
