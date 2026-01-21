import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import BoxCard from "./BoxCard";
import "./BoxList.css";

const BoxList = ({ boxes, onRent, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(boxes.map((box) => box.category))];

  const filteredBoxes = boxes.filter((box) => {
    const matchesSearch =
      box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      box.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || box.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="box-list-container">
      <div className="box-list-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search boxes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <Filter size={20} />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
            >
              {category === "all" ? "All Boxes" : category}
            </button>
          ))}
        </div>
      </div>

      {filteredBoxes.length === 0 ? (
        <div className="no-results">
          <p>No boxes found matching your criteria</p>
        </div>
      ) : (
        <div className="box-grid">
          {filteredBoxes.map((box) => (
            <BoxCard
              key={box.id}
              box={box}
              onRent={onRent}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxList;
