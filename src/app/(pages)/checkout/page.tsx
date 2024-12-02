import { Cart } from './components/cart';
import { PaymentForm } from './components/payment-details/payment-form/payment-form';
import { RedeemCoupon } from './components/redeem-coupon';
import { ReferralCode } from './components/referral-code';

export default async function Checkout() {
    return (
        <div className="w-full flex-col gap-8 rounded-[10px] bg-card p-4">
            <Cart />
            <div className="flex flex-wrap gap-4">
                <RedeemCoupon />
                <ReferralCode />
            </div>
            <PaymentForm />
        </div>
    );
}
