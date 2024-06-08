import React from "react";

function Dropdown({ label, articles }) {
  const handleSelectChange = (event) => {
    const url = event.target.value;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`dropdown ${
        label.toLowerCase().includes("fox") ? "right" : "left"
      }`}
    >
      <label>{label}</label>
      <select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>
          Select an article
        </option>
        {articles.map((article, index) => (
          <option key={index} value={article.link}>
            {article.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
