'use client';


import IndexBanner from '@/../public/index-banner.png';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/stores/settings';
import { getCacheBuster } from '@helpers/cache-buster';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Content() {
    const t = useTranslations('home');
    const { settings } = useSettingsStore();

    return (
        <div className="mt-2 space-y-6">
            <BannerSection />

            <div>
               <h2 className='text-2xl font-bold text-white'>Ultimas notícias</h2>
               <div className='h-[5px] w-20 bg-purple rounded-md'></div>
            </div>

            <div
               className='p-10 h-[30rem] bg-no-repeat bg-cover bg-center flex items-end justify-between rounded-md'
               style={{
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0) 70%), url(${settings?.last_news?.banner || '/news-banner.png'})`,
               }}
            >
               <div className='text-white'>
                  <h2 className='text-3xl font-bold'>{settings?.last_news?.title || 'Guerra de Clãs'}</h2>
                  <p className='text-xl font-medium'>{settings?.last_news?.description || 'O maior evento de clãs já realizado está chegando...'}</p>
               </div>

               <Button className='py-6 font-extrabold text-base'>
                  Continuar lendo
               </Button>
            </div>
        </div>
    );
}

function BannerSection() {
    const t = useTranslations('home');

    const cacheBuster = getCacheBuster();


    return (
        <div className="w-full">
            <Image
               src={`${IndexBanner.src}?${cacheBuster}`}
               alt="Banner"
               width={845}
               height={196}
               className="w-full h-auto"
               onError={(e) => {
                  e.currentTarget.remove();
               }}
            />
        </div>
    );
}
