import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class BillingWrapper extends Component {

  render() {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    debugger;
    return(

      <StripeCheckout
        name="Atacama"
        description="$5 for 5 email survey credits"
        amount={500}
        token={token => this.props.handleBillingToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add $
        </button>
      </StripeCheckout>
    );
  }


}

export default connect(null, actions)(BillingWrapper);
