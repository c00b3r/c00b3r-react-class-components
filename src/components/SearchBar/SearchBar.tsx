import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch: (searchParam: string) => void;
  updateLocalStorageItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  onSearch,
  updateLocalStorageItem,
}: SearchBarProps) {
  const [valueInput, setValueInput] = useState<string>(
    localStorage.getItem("prevSearchItem") ?? "",
  );
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValueInput(event.target?.value);
  }

  function handleClick() {
    onSearch(valueInput);
    setValueInput("");
    if (valueInput === "") {
      navigate("/");
      updateLocalStorageItem("");
    }
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={valueInput}
        onChange={(event) => handleChange(event)}
        placeholder="Search..."
      />
      <button onClick={handleClick}>Search People</button>
    </div>
  );
}
