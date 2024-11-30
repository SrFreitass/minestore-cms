'use client';

import { Container } from '@/components/base/container/container';
import { useCurrencyStore } from '@/stores/currency';
import { useUserStore } from '@/stores/user';
import { TSettings } from '@/types/settings';
import { getModifiedCacheBuster } from '@helpers/cache-buster';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';
import { Navbar } from '@layout/navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HeroSection } from './sections/hero-section';

import { Progress } from '@/components/ui/progress';
import { ReactSVG } from 'react-svg';
import './Header.css';
import { LanguageSection } from '@layout/navbar/sections/language-section';

type HeaderProps = {
    settings: TSettings;
    particles: string;
};

export const Header: FC<HeaderProps> = ({ settings }) => {
    const { user } = useUserStore();
    const cacheBuster = getModifiedCacheBuster(5);

    return (
        <header className="relative">

            <div className="absolute inset-0 -z-20 h-[525px] w-full">
                <div className="hero-image before:bg-primary/20 dark:before:bg-transparent">
                    <Image
                        src={`/background.svg`}
                        className="absolute -z-10 h-full w-full object-cover opacity-60"
                        width={1590}
                        height={352}
                        alt=""
                    />
              
                </div>
            </div>

            <div className="relative">
                <Navbar settings={settings} />

                <HeroSection settings={settings} />
            </div>

            <Container>
                <div className="relative flex h-[3.5rem] items-center bg-primary/20 px-5 mt-20">
                    <div className="absolute inset-0 -z-10 size-full rounded-md bg-primary"></div>
                    <div className="absolute inset-0 -z-10 size-full rounded-md bg-cover opacity-20"></div>

                    <div className='w-full flex justify-center items-center gap-2 font-semibold text-white'>
                       <ReactSVG src={settings.header_info?.icon || '/icons/bell.svg' } />
                       {settings.header_info?.info || 'PROMOÇÃO DE INAUGURAÇÃO | DESCONTOS de até 99% OFF por TEMPO ILIMITADO!'}
                    </div>
                
                    {user && (
                        <>
                            <div className="relative ml-auto mr-8 flex-col text-right">
                                <span className="text-base font-bold text-white sm:text-2xl dark:text-accent-foreground">
                                    {user.username}
                                </span>
                               {settings.is_virtual_currency === 1 && (
                                 <span className="ml-4 text-sm text-accent-foreground/80 sm:text-base">
                                    {user.virtual_currency} {settings.virtual_currency}
                                 </span>
                               )}
                            </div>

                            <div className="relative top-[-45px] hidden h-[200px] overflow-hidden md:block">
                                <Link href="/profile">
                                    <Image
                                        src={user.avatar || ''}
                                        alt="Avatar"
                                        className="h-[270px] w-[111px] -scale-x-100"
                                        width={111}
                                        height={270}
                                    />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
};

function DonationGoal({ goal }: { goal: TSettings['goals'] }) {
    const { currency } = useCurrencyStore();

    if (!goal.length) return null;

    const { current_amount, goal_amount, name } = goal[0];

    const filled = convertToLocalCurrency(current_amount).toFixed(2);
    const goalValue = convertToLocalCurrency(goal_amount).toFixed(2);

    const percent = (current_amount / goal_amount) * 100;

    return (
        <div className="relative flex-col gap-2">
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-lg font-bold text-white sm:text-2xl dark:text-accent-foreground">
                        <span className="sr-only">Donation Goal</span>
                        {name}
                    </p>
                    <p className="text-sm text-accent-foreground/80 sm:text-base">
                        <span className="sr-only">
                            The goal is {name} and the current amount is {filled} out of {goalValue}{' '}
                            {currency?.name || 'USD'}
                        </span>
                        {filled} / {goalValue} {currency?.name || ''}
                    </p>
                </div>
                <p className="font-bold text-white dark:text-accent-foreground">
                    <span className="sr-only">Progress</span>
                    {percent.toFixed(2)}%
                </p>
            </div>

            <Progress value={percent} className="h-2" />
            
        </div>
    );
}
