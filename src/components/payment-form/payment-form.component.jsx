import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { successfulPaymentClearCart } from "../../store/cart/cart.action";
import { selectCartItemTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const total = useSelector(selectCartItemTotal);
    const user = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) return;
        if(total <= 0) return alert('Please add items to cart')
        setIsProcessingPayment(true);
        const paymentResponse = await fetch('.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: (total * 100 )})
        })
            .then(res => res.json())
       const clientSecret = paymentResponse.paymentIntent.client_secret;
       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
           payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                   name: user ? user.displayName : 'Guest',
               }
           }
       });
       setIsProcessingPayment(false);
       if(paymentResult.error) return alert(paymentResult.error.message);
       alert("Payment Successful");
       dispatch(successfulPaymentClearCart());
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={ paymentHandler }>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted} title="Pay Now"></PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;