import { IconButton, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import styles from "@/app/dashboard/dashboard.module.scss";

export const Search = ({ handleOnSearch }) => {
  return (
    <div>
      <Input
        className={styles.searchBar}
        placeholder="search store location"
        onChange={handleOnSearch}
        endAdornment={
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        sx={{
          ":after": {
            borderColor: "black",
          },
        }}
      ></Input>
    </div>
  );
};
