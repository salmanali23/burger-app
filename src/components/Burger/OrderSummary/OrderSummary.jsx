import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
                              .map( (ingKey) => {
                                return (
                                  <li style={{textTransform: 'capitalize'}} key={ingKey}>
                                    <span>{ingKey} </span> : {props.ingredients[ingKey]}
                                  </li>
                                )
                              });
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with following INGREDIENTS</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCanceld} btnType='Danger'>CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
    </Aux>
  );
};
export default orderSummary;
