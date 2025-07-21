import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebaradmine.tsx";
import Header from "../components/HeaderAdmin.tsx";
import UserDashboard from "../components/UserDash.tsx";
const UserDashbordspage:React.FC= () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div className={styles.scrollable}>
          <UserDashboard/>
        </div>
      </div>
    </div>
  );
};
export default UserDashbordspage;