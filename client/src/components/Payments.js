import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    // debugger;

    return (
      <StripeCheckout
        name="Surveystar"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)} // expecting to receive a callback function (after have received auth token from stripe)
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);