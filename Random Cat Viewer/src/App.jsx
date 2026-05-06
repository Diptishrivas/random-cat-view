import { useState, useEffect } from "react";
 

function App() {
  const [cat, setCat] = useState(null);
  const [status, setStatus] = useState("idle");

  async function catLoad() {
    try {
      setStatus("loading");

      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random"
      );

      const data = await res.json();
      
       
       
      setCat(data?.data?.data?.imageUrl);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  useEffect(() => {
    catLoad();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🐱 Random Cat Viewer</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading cat 😿</p>}

      {cat && (
        <img
          src={cat}
          alt="random cat"
          style={{ width: "300px", borderRadius: "12px" }}
        />
      )}

      <br />

      <button onClick={catLoad} style={{ marginTop: "20px" }}>
        Next Cat 😺
      </button>
    </div>
  );
}

export default App;