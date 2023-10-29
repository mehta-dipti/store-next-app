"use client";
import React, { useState } from "react";
import styles from "@/app/dashboard/dashboard.module.scss";
import Link from "next/link";
import { Search } from "./Search";
import { Card } from "./Card";
import { debounce } from "lodash";

export const Dashboard = ({ data }) => {
  const [searchResult, setSearchResult] = useState(data);
  const [searchText, setSearchText] = useState("");

  const handleOnSearch = debounce((e) => {
    let searchedStore = e.target.value;
    let result = [];
    if (searchedStore) {
      result = data.filter((store) => store.name.toLowerCase().includes(searchedStore.toLowerCase()));
      setSearchResult(result);
    } else setSearchResult(data);

    setSearchText(searchedStore);
  }, 500);

  return (
    <div className={styles.dashboard}>
      <Search handleOnSearch={handleOnSearch} />
      {searchResult.map((store) => (
        <Link href={`/dashboard/${store._id}`} className={styles.linkContainer}>
          <Card store={store} searchText={searchText}></Card>
        </Link>
      ))}
    </div>
  );
};
