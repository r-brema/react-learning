import { useRef } from "react";
import { useKey } from "./useKey";

function Search({ searchText, setSearchText }) {
  const searchRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === searchRef.current) return;
    setSearchText("");
    searchRef.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      ref={searchRef}
      placeholder="Search movies..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}

export default Search;
