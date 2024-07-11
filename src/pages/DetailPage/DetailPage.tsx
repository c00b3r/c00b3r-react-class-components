import React, { useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./DetailPage.css";

interface personData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export default function DetailPage() {
  const result = useLoaderData() as personData;
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate("/");
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [navigate]);

  return (
    <div className="peopleInfo" ref={ref}>
      <p>
        <span style={{ fontWeight: "bold" }}>Height:</span> {result.height}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Mass:</span> {result.mass}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>BirthYear:</span>{" "}
        {result.birth_year}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Gender</span> {result.gender}
      </p>
      <button onClick={() => (ref.current!.style.display = "none")}>
        Close
      </button>
    </div>
  );
}
