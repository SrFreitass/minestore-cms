'use client';

import { TSettings } from '@/types/settings';
import { FC } from 'react';
import { ShoppingCartSection } from './sections/shopping-cart-section';



type NavbarProps = {
    settings: TSettings;
};

export const Navbar: FC<NavbarProps> = () => {
    return (
        <nav className="z-20 h-[63px] w-full flex-row items-center max-w-[650px] mx-auto">
           <ul className='flex justify-around items-center font-bold text-white w-full'>
              <div className='flex gap-8'>
                  <li>
                     Equipe
                  </li>

                  <li>
                     Investidor
                  </li>
              </div>

              <li>
                 Loja
              </li>

              <div className='flex gap-8'>
                  <li>
                     Wiki
                  </li>

                  <li>
                     Parceiros
                  </li>
              </div>

              <ShoppingCartSection />
           </ul>
          {/* <div className="hidden items-center md:flex">
                <CurrencySection settings={settings} />
                <Divider />
            </div>
            <div className="hidden items-center lg:flex">
                <LanguageSection settings={settings} />
                <Divider />
            </div>
            <Divider />
            <UserSection /> */}
        </nav>
    );
};
