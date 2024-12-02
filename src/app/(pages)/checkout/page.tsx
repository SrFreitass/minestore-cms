import { Cart } from './components/cart';
import { PaymentForm } from './components/payment-details/payment-form/payment-form';

export default async function Checkout() {
    return (
        <div className="w-full flex-col gap-2 rounded-[10px] bg-card p-4">
            <Cart />
            <div className="flex flex-wrap gap-4">
            </div>
            <PaymentForm />
        </div>
    );
}
