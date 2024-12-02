'use client';

import { Container } from '@/components/base/container/container';
import { TSettings } from '@/types/settings';
import { getCacheBuster } from '@helpers/cache-buster';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

export type FooterProps = {
    settings: TSettings;
};

export const Footer: FC<FooterProps> = ({ settings }) => {
    return (
        <div className="bg-card/60 mt-16">
            <Container className="-mt-8 flex justify-between gap-8 py-16 max-w-[1520px] m-auto max-md:flex-col">

                <Copyright settings={settings} />
                {/* <AboutUs settings={settings} /> */}
                <SocialIcons settings={settings} />
            </Container>
        </div>
    );
};

function UsefulLinks({ settings }: { settings: TSettings }) {
    const t = useTranslations('footer');

    if (!settings.footer) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center lg:mt-24">
            <div>
                <h3 className="text-2xl font-bold text-card-foreground md:text-3xl">
                    {t('useful-links')}
                </h3>
                <hr className="mx-auto mt-2 h-1 w-12 rounded border-0 bg-primary" />
            </div>
            <ul className="space-y-2">
                {settings.footer.map((item, index) => (
                    <li key={index}>
                        <Link href={item.url}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Copyright({ settings }: { settings: TSettings }) {
    const t = useTranslations('footer');
    const cacheBuster = getCacheBuster();
    return (
        <div className="flex flex-col items-start justify-start gap-6 text-start w-[55%] max-md:w-full">
            {/* <Image
                className="aspect-square w-[260px] object-contain"
                src={`${process.env.NEXT_PUBLIC_API_URL}/img/logo.png?${cacheBuster}`}
                width={260}
                height={231}
                alt="Logo"
            /> */}
            <h3 className="text-2xl font-bold text-white/90">
                Spot Games é um servidor de Minecraft com uma variedade de minigames, voltado para a comunidade do Brasil. Nosso objetivo é garantir a diversão de todos os jogadores!
            </h3>
            <div className="font-bold text-base text-white/25 flex flex-col gap-4">
                <p>
                  SpotGames © - Todos direitos reservados.
                </p>
                <p>
                  CNPJ 56.267.015/0001-75
                </p>
                <p>
                  A Spot Games não possui qualquer afiliação ou endosso da Mojang.
                </p>
            </div>
        </div>
    );
}

// function AboutUs({ settings }: { settings: TSettings }) {
//     const t = useTranslations('footer');

//     const { website_name } = settings;

//     return (
//         <div className="hidden flex-col items-center justify-center gap-6 text-center lg:mt-24 lg:flex">
//             <div>
//                 <h3 className="text-2xl font-bold text-card-foreground md:text-3xl">
//                     {t('about-us')}
//                 </h3>
//                 <hr className="mx-auto mt-2 h-1 w-12 rounded border-0 bg-primary" />
//             </div>
//             <p className="text-balance">
//                 {website_name} {t('description')}
//             </p>
//         </div>
//     );
// }

function SocialIcons({ settings }: { settings: TSettings }) {
    const socials = settings.socials;

    // delete this line;
    // mock data
   settings.socials = {
      discord: 'https://discord.gg/spotgames',
      twitter: 'https://twitter.com/spotgamesbr',
      instagram: 'https://www.instagram.com/spotgamesbr/',
   };

    return (
        <div className="flex flex-col items-end gap-4 font-bold max-md:items-start">
           <div className='flex gap-6'>
            {Object.entries(socials).map(([key, value], index) => (
                <Link key={index} href={value} className='bg-white/25 p-2 rounded-md'>
                    <ReactSVG
                        src={`/icons/${key}.svg`}
                        width={32}
                        height={32}
                        beforeInjection={(svg) => {
                            svg.classList.add('w-6', 'h-6');
                        }}
                    />
                </Link>
            ))}
           </div>
            Feito com muito 🧡 Pela <br/> Lunar Studios
        </div>
    );
}
