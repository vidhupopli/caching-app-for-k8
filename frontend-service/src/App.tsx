import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [makeAPIRequest, setMakeAPIRequest] = useState<string>("");
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [dataRecd, setDataRecd] = useState("");

  useEffect(() => {
    if (!makeAPIRequest) return;

    if (timeoutReference) {
      clearTimeout(timeoutReference.current);
    }

    const newTimeoutRef = setTimeout(async () => {
      try {
        let response = null;

        if (makeAPIRequest === "check") {
          response = await fetch("/api/", { method: "GET" });
        } else if (makeAPIRequest === "posts") {
          response = await fetch("/api/posts", { method: "GET" });
        } else if (makeAPIRequest === "specificPost") {
          const postId = prompt("Enter post id");
          response = await fetch("/api/posts/" + postId, { method: "GET" });
        }

        const data = await response!.json();
        setDataRecd(JSON.stringify(data));
      } catch (e) {
        console.log("couldnt make api call", e);
      }
    }, 300);

    timeoutReference.current = newTimeoutRef;
  }, [makeAPIRequest]);

  return (
    <>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
        <button
          onClick={() => {
            setMakeAPIRequest("check");
          }}
        >
          BE Up Status
        </button>
        <button
          onClick={() => {
            setMakeAPIRequest("posts");
          }}
        >
          All Posts
        </button>
        <button
          onClick={() => {
            setMakeAPIRequest("specificPost");
          }}
        >
          Specific Post
        </button>
      </div>
      <hr />
      <p>{dataRecd || "No Data Fetched Yet"}</p>
    </>
  );
}

export default App;
