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

  const result = data.results;
  const location = useLocation();

  const handleCheckboxChange = (
    peopleName: string,
    peopleBirthYear: string,
    peopleGender: string,
    peopleHeight: string,
  ) => {
    dispatch(
      toggleItem({
        name: peopleName,
        birthYear: peopleBirthYear,
        gender: peopleGender,
        height: peopleHeight,
      }),
    );
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
            <div key={peopleItem.name} className="person-wrapper">
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (item) => item.name === peopleItem.name,
                )}
                onChange={() =>
                  handleCheckboxChange(
                    peopleItem.name,
                    peopleItem.birth_year,
                    peopleItem.gender,
                    peopleItem.height,
                  )
                }
              />
              <NavLink
                to={`/people/${peopleItem.url.split("/")[5]}${location.search}`}
                className={({ isActive, isPending }) =>
                  `${isActive ? "active" : ""} ${isPending ? "pending" : ""}`
                }
              >
                <h3 className="person-name">{peopleItem.name}</h3>
              </NavLink>
            </div>
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
