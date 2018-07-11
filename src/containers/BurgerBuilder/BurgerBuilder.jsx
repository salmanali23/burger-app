import React , { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
  salad: 5,
  cheese: 4,
  meat: 3,
  bacon: 7
}
class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    this.setState({totalPrice: updatedPrice , ingredients: updatedIngredients });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceRemove = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceRemove;
    this.setState({totalPrice: updatedPrice , ingredients: updatedIngredients })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo} />
      </Aux>
    );
  }
}
export default BurgerBuilder;
