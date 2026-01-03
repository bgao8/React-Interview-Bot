import { useNavigate } from "react-router-dom";
import "../styles/Home.css"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Hone</h1>
      <button className="start-button" onClick={() => navigate("/start")}>
        Configure Interview
      </button>
    </div>
  );
}