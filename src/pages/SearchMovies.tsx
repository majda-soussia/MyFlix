import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import ListMoviesSearch from "../components/ListMoviesSearch.tsx";

const AccountSetting:React.FC= () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div className={styles.scrollable} >
          <ListMoviesSearch/>
        </div>
      </div>
    </div>
  );
};
export default AccountSetting;
