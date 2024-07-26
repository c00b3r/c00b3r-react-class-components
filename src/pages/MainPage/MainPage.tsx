import { useContext, useEffect, useState } from "react";
import { Data } from "../../interface";
import useLocalStorage from "../../hooks/useLocalStorage";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import "./MainPage.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { starWarsApi } from "../../store/thunks/starWarsApi";
import FlyoutComponent from "../../components/FlyoutComponent/FlyoutComponent";
import DarkLightThemeContext from "../../context/LightDarkThemeContext";

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
  const themeContext = useContext(DarkLightThemeContext);

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

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={`main-page ${theme}`}>
      <div className="main-wrapper">
        <div className="header">
          <SearchBar
            onSearch={handleSearch}
            updateLocalStorageItem={setLocalStorageItem}
          />
          <button onClick={toggleTheme} className="switch-theme">
            Switch to {theme === "dark" ? "Light" : "Dark"} Theme
          </button>
        </div>
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
      <FlyoutComponent />
    </div>
  );
}
