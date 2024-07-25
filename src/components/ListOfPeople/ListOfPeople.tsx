import { Dispatch, SetStateAction } from "react";
import { Data } from "../../interface";
import "./styles.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { toggleItem } from "../../store/slices/selectedItemsSlice";

interface ListOfPeopleProps {
  data: Data;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function ListOfPeople({
  data,
  page,
  setPage,
}: ListOfPeopleProps) {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItem);
  console.log(selectedItems);

  const result = data.results;
  const location = useLocation();

  const handleCheckboxChange = (peopleName: string) => {
    dispatch(toggleItem(peopleName));
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (data.next) {
      setPage(page + 1);
    }
  };
  return (
    <div className="list-people-wrapper">
      <div className="list-characters-wrapper">
        {result && result.length ? (
          result.map((peopleItem) => (
            <NavLink
              to={`/people/${peopleItem.url.split("/")[5]}${location.search}`}
              key={peopleItem.name}
              className={({ isActive, isPending }) =>
                `person-wrapper ${isActive ? "active" : ""} ${isPending ? "pending" : ""}`
              }
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(peopleItem.name)}
                onChange={() => handleCheckboxChange(peopleItem.name)}
              />
              <h3 className="person-name">{peopleItem.name}</h3>
            </NavLink>
          ))
        ) : (
          <h4 style={{ grid: "none", margin: "0 auto", display: "" }}>
            = Data Not Found =
          </h4>
        )}
      </div>
      {data.count > 10 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            alignSelf: "center",
          }}
        >
          <button disabled={page === 1} onClick={handlePreviousClick}>
            ←
          </button>
          <p>{page}</p>
          <button
            disabled={data.next === null ? true : false}
            onClick={handleNextClick}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
