import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Favorites from "../components/Favorites.tsx";

const FavoritesPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div className={styles.scrollable} >
        <Favorites/>
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage;