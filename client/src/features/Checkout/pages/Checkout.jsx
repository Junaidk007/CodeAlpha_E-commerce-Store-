import CheckOutCard from "../components/CheckOutCard";
import PriceDetailCard from "../components/PriceDetailCard";
import "./Checkout.css";

function Checkout() {
    return (
        <>
            <div className="checkout-container">
                <div className="checkout-items-container">
                    <CheckOutCard />
                    <CheckOutCard />
                    <CheckOutCard />
                </div>
                <div className="checkout-price-container">
                    <PriceDetailCard />
                </div>
            </div>
        </>
    );
}

export default Checkout;