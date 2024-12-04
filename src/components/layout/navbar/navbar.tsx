'use client';

import { TSettings } from '@/types/settings';
import { Menu, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { DropmenuCart } from './sections/dropmenu-cart';



type NavbarProps = {
    settings: TSettings;
};

export const Navbar: FC<NavbarProps> = () => {
   const route = usePathname();

   console.log(route)


   const homeIcon = route === '/team' ? {
      marginTop: '-1.75rem',
      marginLeft: '-17.75rem',   
      width: '5rem',
      height: '2rem',
      zIndex: -1
   } : {
      marginLeft: '-.3rem'
   }
   const [openMenu, setOpenMenu] = useState(false);

   const toggleMenu = () => {
      setOpenMenu(!openMenu)
      document.body.style.overflow = openMenu ? 'auto' : 'hidden'
   }

    return (
        <nav className="z-20 h-[63px] w-full flex-row items-center max-w-[650px] mx-auto">
           <ul className='max-sm:px-4 md:hidden'>
               <Menu size={24} onClick={toggleMenu}/>
               <div className={`${openMenu ? 'flex' : 'hidden'} h-screen bg-[#161616] absolute inset-0 z-20 w-96 max-sm:w-full`}>
                  <div className='flex flex-col gap-4 items-start justify-start h-full font-bold px-6 py-5 text-white text-xl'>
                   <li onClick={toggleMenu}>
                        <XIcon/>
                     </li>

                     <li onClick={toggleMenu}>
                        <Link href={'/team'}>
                           Equipe
                        </Link>
                     </li>

                     <li>
                        Investidor
                     </li>

                     <li onClick={toggleMenu}>
                        <Link href='/'>
                           Loja
                        </Link>
                     </li>

                     <li>
                        Wiki
                     </li>

                     <li>
                        Parceiros
                     </li>
                  </div>
               </div>
           </ul>
           <ul className='flex justify-around items-center font-bold text-white w-full relative max-w-[1520px] max-md:hidden'>
              <div className='flex gap-8'>
                 <li className={`${route === '/team' ? 'text-purple' : ''}`}>
                     <Link href={'/team'}>
                        Equipe
                     </Link>
                  </li>

                  <li>
                     Investidor
                  </li>
              </div>

              <li>
                 <Link href='/'>
                    Loja
                 </Link>
                 <div className={`transition-all absolute bg-white rounded-3xl mt-3`} style={homeIcon}>
                    <p className={`${route === '/team' ? '' : 'hidden'}`}>a</p>
                    <ReactSVG src='/icons/ant-design_home-filled.svg' className={` p-1 px-2 ${route === '/team' ? 'hidden' : ''}`} />
                 </div>
              </li>

              <div className='flex gap-8'>
                  <li>
                     Wiki
                  </li>

                  <li>
                     Parceiros
                  </li>
              </div>

           </ul>
           <DropmenuCart/>
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
