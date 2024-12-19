import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';
import Image from 'next/image';
import { FC } from 'react';

type PriceProps = {
    value: number;
    isVirtual?: boolean;
    className?: string;
    discount?: number;
    originalPrice?: number;
};

type PriceTagProps = {
    price: number;
    currency: string;
    isVirtual: boolean;
    discount?: number;
    originalPrice?: number;
    className?: string;
};

type VariablePriceProps = {
   value: number;
};

const PriceTag: FC<PriceTagProps> = ({
    price,
    currency,
    isVirtual,
    discount,
    originalPrice,
    className
}) => {
    const { settings } = useSettingsStore();

    let displayPrice = 'R$0,00';
    let discountedPrice: string | null = null;

    const hasDiscountOrOriginalPrice = discount || originalPrice;
    const effectivePrice = originalPrice || price + (discount || 0);

    if (isVirtual) {
        displayPrice = `${settings?.virtual_currency}`;
    } else if (price > 0) {
        displayPrice = `${price.toFixed(2)}`;
        discountedPrice = hasDiscountOrOriginalPrice
            ? `${effectivePrice.toFixed(2)}`
            : null;
    }

    return (
         <p className={className}>
            {(discountedPrice && discountedPrice !== displayPrice) ? (
               <>
                    <div className='flex gap-1'>
                        <s className="text-zinc-600 line-through flex flex-row-reverse">
                            {currency} {effectivePrice.toFixed(2).replace('.', ',')}
                        </s>
                        <DiscountTag discount={(discount || 0) / effectivePrice * 100}/>
                    </div>
                    <span className={`text-xl text-white font-bold`}>
                        <span className='text-base font-medium'>
                            {currency}
                        </span>
                        {' '}
                        {displayPrice.replace('.', ',')}
                    </span>
               </>
            ) : (
               <>
                   <span className="text-xl text-white font-bold">
                        <span className='text-base font-medium'>
                            {currency}
                        </span>
                        {' '}
                        {displayPrice.replace('.', ',')}
                    </span>
               </>
            )}
         </p>
      );
};

export const Price: FC<PriceProps> = ({
    value,
    isVirtual = false,
    className,
    discount,
    originalPrice
}) => {
    const { currency } = useCurrencyStore();
    const localCurrencyName = currency?.name || '';
    const localPrice = convertToLocalCurrency(value);
    const localDiscount = discount ? convertToLocalCurrency(discount) : 0;
    const localOriginalPrice = originalPrice ? convertToLocalCurrency(originalPrice) : 0;

    return (
        <PriceTag
            originalPrice={localOriginalPrice}
            price={localPrice}
            currency={localCurrencyName}
            isVirtual={isVirtual}
            discount={localDiscount}
            className={className}
        />
    );
};

export const VariablePrice: FC<VariablePriceProps> = ({ value }) => {
   const { currency } = useCurrencyStore();
   const localCurrencyName = currency?.name || '';
   const localPrice = convertToLocalCurrency(value).toFixed(2);

   return (
      <span>
         {localPrice}
         {localCurrencyName}
      </span>
   );
};

export const DiscountTag = ({discount}: { discount: number | string }) => {
   return (
      <div className={`relative flex justify-center items-center`}>
          <p className='absolute text-red-500 font-bold ml-3'>-{discount}%</p>
          <Image src='/media/discount-card.svg' width={55} height={20} alt=''/>
      </div>
   )
}
