import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class BillingWrapper extends Component {

  render() {
    return(
      <StripeCheckout />
    );
  }

}

export default BillingWrapper;
