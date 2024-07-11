import React from "react";
import { useLoaderData } from "react-router-dom";

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
  return (
    <div className="peopleInfo">
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
    </div>
  );
}
