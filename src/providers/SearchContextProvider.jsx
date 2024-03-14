import React, { createContext, useState } from "react";

export const searchContext = createContext();
export default function SearchContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  return (
    <searchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResult, setSearchResult }}
    >
      {children}
    </searchContext.Provider>
  );
}
