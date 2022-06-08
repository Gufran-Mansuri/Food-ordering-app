import React, { useEffect, useState } from "react";
import styles from "./AvaibleMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItems/MealsItem.js";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-a65a5-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);
  if (isLoading) {
    return <div className={styles.MealLoading}>Loading...</div>;
  }
  if (httpError) {
    return <div className={styles.MealLoading}>{httpError}</div>;
  }
  return (
    <section className={styles.meals}>
      <Card>
        <ul className={styles}>
          {meals.map((meal) => (
            <MealsItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
