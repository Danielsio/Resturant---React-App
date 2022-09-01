import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    getMeals().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  const getMeals = async () => {
    const response = await fetch(
      "https://react-http-b574b-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong...");
    }

    const mealsData = await response.json();
    // transform data from DB to an array you can work with
    const dataOfMeals = [];

    for (const key in mealsData) {
      dataOfMeals.push({
        id: key,
        name: mealsData[key].name,
        descreption: mealsData[key].descreption,
        price: mealsData[key].price,
      });
    }
    setMeals(dataOfMeals);
    setIsLoading(false);
  };

  if (hasError) {
    return <p className={classes.MealsError}>{hasError}</p>;
  }

  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading...</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
