import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';



import { Input } from '@/components/ui/input';

import { getFormCountries } from '@/constants/countries';

import { useSettingsStore } from '@/stores/settings';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

export const UserDetailsForm = () => {
    const { settings } = useSettingsStore();
    const formCountries = getFormCountries();

    const { setValue } = useFormContext();

    const t = useTranslations('checkout.details');

    return (
        <div className="p-8 flex bg-royal-sec rounded-md">
            <div className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white">
                    Primeiras etapas
                </h2>
                <div className="flex flex-col gap-4 max-w-96 w-full">
                    <FormField
                        defaultValue=""
                        name="details.nickname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Seu nickname</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nick in-game" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        name="details.fullname"
                        defaultValue=""
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome real" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        defaultValue=""
                        name="details.email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Seu e-mail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
