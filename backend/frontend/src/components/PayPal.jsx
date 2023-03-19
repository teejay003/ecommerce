import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

 function PayPal() {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.ECOMMERCE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
}


export default PayPal