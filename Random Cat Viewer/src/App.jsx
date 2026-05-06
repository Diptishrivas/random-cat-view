import { useState, useEffect } from "react";

function App() {
  const [cat, setCat] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function loadCat() {
      try {
        setStatus("loading");

        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/cats/cat/random"
        );

        const data = await res.json();
        const imageUrl = data?.data?.data?.imageUrl;

        setCat(imageUrl);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadCat();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"> Random Cat Viewer</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading cat</p>}

      {cat && status === "success" && (
        <img
          src={cat}
          alt="cat"
          className="w-72 h-72 object-cover rounded-xl"
        />
      )}

      <button onClick={() => window.location.reload()} className="mt-4">
        Next Cat
      </button>
    </div>
  );
}

export default App;