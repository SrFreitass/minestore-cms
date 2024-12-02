import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TPayments } from '@/types/payments';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Label } from '@/components/ui/label';
import { TCart } from '@/types/cart';

import { Checkbox } from '@/components/ui/checkbox';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const { getPaymentMethods } = getEndpoints(fetcher);

type PaymentMethodFormProps = {
    items: TCart['items'];
};

export const PaymentMethodForm = ({ items }: PaymentMethodFormProps) => {
    const t = useTranslations('checkout');
    const {} = useFormContext();

    const [paymentMethods, setPaymentMethods] = useState<TPayments>([]);

    useEffect(() => {
        getPaymentMethods()
            .then((response) => {
                setPaymentMethods(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [items]);

    return (
        <div className="space-y-4 rounded-md border border-border p-4 bg-[#25262F]">
            <FormField
                name="paymentMethod"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-[20px] font-bold text-white">
                            Meios de pagamento
                            <p className="font-medium text-zinc-400">Selecione um meio de pagamento</p>
                        </FormLabel>
                        <RadioGroup
                            className="grid grid-cols-2 gap-4 md:grid-cols-3"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                         {paymentMethods.map((method, index) => {
                           if(method.name !== 'PayPalIPN' && method.name !== 'MercadoPago' && method.name !== 'Stripe') return null;

                            return (<div key={index}>
                               <RadioGroupItem
                                  value={method.name}
                                  id={method.name}
                                  className="peer sr-only transition-all"
                               />
                               <Label
                                  htmlFor={method.name}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-[#20212C] py-2 transition-all hover:bg-[#31323B] hover:text-white peer-data-[state=checked]:border-white
                                        peer-data-[state=checked]:bg-[#31323B] [&:has([data-state=checked])]:border-primary
                                        font-bold text-lg
                                        "
                               >
                                  {/* {method.name === 'Cordarium' ? 'Crypto' : method.name} */}
                                  <Image
                                     className="h-20 w-28 rounded object-contain"
                                     src={`/media/payments/${method.name.toLowerCase()}.svg`}
                                     alt=""
                                     width={112}
                                     height={80}
                                  />
                               </Label>
                            </div>)
                         })}
                        </RadioGroup>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="termsAndConditions"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormDescription className='text-white font-medium text-sm'>
                              Todos os pagamentos são finais e não reembolsáveis. Tentativas de chargeback ou disputas no PayPal resultarão em banimento permanente e irreversível de nossos servidores e lojas de Minecraft.
                            </FormDescription>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};
