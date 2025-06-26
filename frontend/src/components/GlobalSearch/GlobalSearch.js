import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./GlobalSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults(null);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timer
    clearTimeout(timeoutRef.current);

    if (value.trim().length < 2) {
      setResults(null);
      return;
    }

    // Set new timer
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/search?q=${value}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search error", err);
      }
    }, 400); // 400ms debounce
  };
  return (
    <div className="global-search" ref={containerRef}>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search projects, epics, tasks..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
      {results && (
        <div className="search-results">
          {["projects", "epics", "stories", "tasks", "users"].map((type) =>
            results[type]?.length ? (
              <div key={type}>
                <h4>{type.toUpperCase()}</h4>
                <ul>
                  {results[type].map((item) => (
                    <li key={item.id}>{item.title || item.name}</li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
