import { useEffect, useRef } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import "./DetailPage.css";
import { personData } from "../../interface";

export default function DetailPage() {
  const result = useLoaderData() as personData;
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !target.closest("a") &&
        !target.closest("input")
      ) {
        navigate(`/${location.search}`);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [navigate, location]);

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
        <span style={{ fontWeight: "bold" }}>Gender:</span> {result.gender}
      </p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
