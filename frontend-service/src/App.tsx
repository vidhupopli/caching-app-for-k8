import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [makeAPIRequest, setMakeAPIRequest] = useState(0);
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!makeAPIRequest) return;

    if (timeoutReference) {
      clearTimeout(timeoutReference.current);
    }

    const newTimeoutRef = setTimeout(async () => {
      try {
        const response = await fetch(url, { method: "GET" });
        console.log("response is -->", response);
        const data = await response.json();
        console.log("body recd is -->", data);
      } catch (e) {
        console.log("couldnt make api call", e);
      }
    }, 300);

    timeoutReference.current = newTimeoutRef;
  }, [makeAPIRequest]);

  return (
    <>
      <div style={{ display: "flex", gap: "2rem" }}>
        <input
          style={{ width: "24rem" }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Enter URL"
        />
        <button
          onClick={() => {
            setMakeAPIRequest((prev) => prev + 1);
          }}
        >
          Make Request
        </button>
      </div>
    </>
  );
}

export default App;
