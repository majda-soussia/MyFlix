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
        <Favorites/>
        <div className={styles.scrollable} >
          
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage;