import React from "react";
import Popular from "../components/PopularRecipe";
import Search from "../components/RecipeSearch";
import styles from "./Home.module.css";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div className={styles.home}>
      <Search />
      <Popular />
      <Footer />
    </div>
  );
};

export default Home;
