import React from 'react';
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map(ingdKey => {
      //Array(props.ingredients[ingdKey]) will return array of no of elements
      return [...Array(props.ingredients[ingdKey])].map((_, i) => {
        return <BurgerIngredient key={ingdKey + i} type={ingdKey} />
      });
    })
    .reduce((arr, ele) => {
      return arr.concat(ele)
    } , []);
  if (transformIngredients.length === 0){
    transformIngredients = <p> Please add some Ingredients! </p>
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'}/>
        {transformIngredients}
      <BurgerIngredient type={'bread-bottom'}/>
    </div>
  );
}

export default burger;
