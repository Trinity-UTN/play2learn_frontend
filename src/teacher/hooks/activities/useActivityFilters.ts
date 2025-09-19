import { useState } from "react";

export const useActivityFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
  };
};
