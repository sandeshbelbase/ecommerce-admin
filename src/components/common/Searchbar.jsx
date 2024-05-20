import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import React from "react";

export default function Searchbar({ setSearch }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#c6e3ff",
        width: "30%",
        marginRight: "150px",
        borderRadius: "20px",
        padding: "5px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
