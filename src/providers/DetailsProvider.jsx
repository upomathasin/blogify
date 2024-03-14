import React from "react";
import { DetailContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function DetailsProvider({ children }) {
  const navigate = useNavigate();
  const showAuthor = (e, id) => {
    e.stopPropagation();
    navigate(`profile/${id}`);
  };
  const showDetails = (id) => {
    navigate(`blogDetails/${id}`);
  };
  return (
    <DetailContext.Provider value={{ showAuthor, showDetails }}>
      {children}
    </DetailContext.Provider>
  );
}
