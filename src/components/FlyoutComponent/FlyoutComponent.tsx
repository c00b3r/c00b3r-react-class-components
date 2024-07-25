import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import "./FlyoutComponent.css";
import { clearSelectedItems } from "../../store/slices/selectedItemsSlice";

export default function FlyoutComponent() {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItem);

  function handleUnselectOnClick() {
    dispatch(clearSelectedItems());
  }

  return (
    <>
      {selectedItems && selectedItems.length ? (
        <div className="favorite-wrapper">
          <div className="favorite-wrapper__tools">
            <h4>{selectedItems.length} items are selected</h4>
            <button className="tools__button" onClick={handleUnselectOnClick}>
              Unselect all
            </button>
            <button className="tools__button">Download</button>
          </div>
          <div className="favorite-items__list">
            {selectedItems.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
