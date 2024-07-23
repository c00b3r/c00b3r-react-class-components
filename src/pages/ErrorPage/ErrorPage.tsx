import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h1>Oops! Page Not Found</h1>
      <button
        onClick={handleClick}
        style={{ width: "250px", alignSelf: "center" }}
      >
        Go To Main Page
      </button>
    </div>
  );
}
