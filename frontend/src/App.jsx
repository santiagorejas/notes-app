import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/v1/notes");
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  });

  return (
    <div className="App">
      <h1>Notes App!</h1>
    </div>
  );
}

export default App;
