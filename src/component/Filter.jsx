import React, { useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiRefreshCcw,
  FiSearch,
} from "react-icons/fi";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Filter = () => {
  const categories = [
    { categoryId: 1, categoryName: "Furniture" },
    { categoryId: 2, categoryName: "Toys" },
    { categoryId: 3, categoryName: "Books" },
    { categoryId: 4, categoryName: "Cloths" },
    { categoryId: 5, categoryName: "Sports" },
  ];

  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  // CATEGORY CHANGE
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    navigate(`${location.pathname}?${params.toString()}`);
    setCategory(selectedCategory);
  };

  // SORT ORDER
  const toggleSortOrder = () => {
    const params = new URLSearchParams(searchParams);

    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";

      params.set("sortby", newOrder);

      navigate(`${location.pathname}?${params.toString()}`);

      return newOrder;
    });
  };

  // SEARCH
  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      params.delete("keyword");
    } else {
      params.set("keyword", value);
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  // CLEAR FILTER
  const clearFilters = () => {
    setCategory("all");
    setSortOrder("asc");
    setSearchTerm("");

    navigate(location.pathname);
  };

  return (
    <div
      className="flex lg:flex-row flex-col-reverse
      lg:justify-center justify-center
      items-center gap-4"
    >
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          className="border border-gray-400 text-slate-800
          rounded-md py-2 pl-10 pr-4 w-full
          focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearch}
        />

        <FiSearch
          size={20}
          className="absolute left-3 text-slate-800"
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex lg:flex-row flex-col gap-4 items-center">
        <FormControl size="small" className="w-[200px]">
          <InputLabel id="category-select-label">
            Category
          </InputLabel>

          <Select
            labelId="category-select-label"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All</MenuItem>

            {categories.map((item) => (
              <MenuItem
                key={item.categoryId}
                value={item.categoryName}
              >
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORT BUTTON */}
        <Tooltip title={`Sorted by price : ${sortOrder}`}>
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            Sort By

            {sortOrder === "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>

        {/* CLEAR FILTER BUTTON */}
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 bg-rose-900
          text-white px-3 py-2 rounded-md
          transition duration-300 ease-in
          shadow-md focus:outline-none"
        >
          <FiRefreshCcw />

          <span className="font-semibold">
            Clear Filter
          </span>
        </button>
      </div>
    </div>
  );
};

export default Filter;