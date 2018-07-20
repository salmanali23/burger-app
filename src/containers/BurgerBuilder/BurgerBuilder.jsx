import React , { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
  salad: 5,
  cheese: 4,
  meat: 3,
  bacon: 7
}
class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    this.setState({purchasable: sum > 0})
  }

  purchaseHandler(){
    this.setState({purchasing: true});
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
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseCancelHandler(){
    this.setState({purchasing: false});
  }

  purchaseContinueHandler(){
    alert('you continue')
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
    this.setState({totalPrice: updatedPrice , ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
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

        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
            purchaseCanceld={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}
export default BurgerBuilder;
