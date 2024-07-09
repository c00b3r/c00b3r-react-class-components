import React, { useState } from "react";
import "./styles.css";

interface SearchBarProps {
  onSearch: (searchParam: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [valueInput, setValueInput] = useState<string>(
    localStorage.getItem("prevSearchItem") ?? "",
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValueInput(event.target?.value);
  }

  function handleClick() {
    onSearch(valueInput);
    setValueInput("");
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={valueInput}
        onChange={(event) => handleChange(event)}
      />
      <button onClick={handleClick}>Search People</button>
    </div>
  );
}
