import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {

  componentWillUpdate(){
    console.log('OrderSummary Update');
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
                              .map( (ingKey) => {
                                return (
                                  <li style={{textTransform: 'capitalize'}} key={ingKey}>
                                    <span>{ingKey} </span> : {this.props.ingredients[ingKey]}
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
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCanceld} btnType='Danger'>CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
      </Aux>
    );
  }
}
export default OrderSummary;
