import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const PaymentFormSubmit = ({ loading }: { loading: boolean }) => {
    const t = useTranslations('checkout');

    return (
        <div className="flex flex-col items-start justify-between px-8 bg-royal-sec relative bottom-5 pb-8 rounded-b-lg">
            <FormField
                name="privacyPolicy"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none text-white">
                            <FormLabel className='!text-sm'>
                               Eu li e concordo com os <span className='text-orange'>termos e condições</span> de
                               compra.
                            </FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <Button
                type="submit"
                disabled={loading}
                className="mt-4 px-4 flex w-full items-center justify-center gap-2 md:w-auto text-base"
            >
                {loading && <Loader2 className="animate-spin" size={24} />}
                Finalizar compra
            </Button>
        </div>
    );
};
