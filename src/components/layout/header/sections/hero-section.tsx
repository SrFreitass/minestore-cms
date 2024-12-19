import { getEndpoints } from '@/api';
import { notify } from '@/core/notifications';
import { TSettings } from '@/types/settings';
import { getCacheBuster } from '@helpers/cache-buster';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const { discordWidget, getServerOnline } = getEndpoints(axios);

type HeroSectionProps = {
    settings: TSettings;
};

export const HeroSection: FC<HeroSectionProps> = ({ settings }) => {
    const t = useTranslations('header');

    const [serverOnline, setServerOnline] = useState(0);
    const [discordOnline, setDiscordOnline] = useState(0);

    const fetchOnline = useCallback(async () => {
        const promises = [
            discordWidget(settings.discord_id)
                .then((data) => ({
                    type: 'discord',
                    count: data.presence_count
                }))
                .catch(() => ({
                    type: 'discord',
                    count: 0
                })),
            getServerOnline(settings.server.ip, settings.server.port)
                .then((data) => ({
                    type: 'server',
                    count: data.onlinePlayers || 0
                }))
                .catch(() => ({
                    type: 'server',
                    count: 0
                }))
        ];

        const results = await Promise.allSettled(promises);
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                if (result.value.type === 'discord') {
                    setDiscordOnline(result.value.count);
                } else if (result.value.type === 'server') {
                    setServerOnline(result.value.count);
                }
            } else {
                console.error('Error fetching data:', result.reason);
            }
        });
    }, [settings.discord_id, settings.server.ip, settings.server.port]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchOnline();
        };

        fetchData();
        const interval = setInterval(fetchData, 20000);

        return () => clearInterval(interval);
    }, [fetchOnline]);

    const handleCopyServerIP = () => {
        navigator.clipboard.writeText(settings.server.ip);
        notify(`${t('copied-to-clipboard')}`, 'green');
    };

    const cacheBuster = getCacheBuster();

    return (
        <div className="relative w-full flex-row items-center justify-center">
           <Link
               href={settings.discord_url}
               className="-mt-20 hidden items-center gap-2 transition duration-300 hover:scale-110 lg:flex flex-row-reverse font-semibold translate-y-20"
           >
               <div className="ml-0.5 flex-col">
                   <span className="text-base font-bold text-orange">
                      Junte-se a comunidade
                   </span>
                   <span className="text-sm text-white/75">
                      1.000+ membros disponíveis
                   </span>
               </div>
               <div className="flex flex-col items-center justify-center relative">
                  <ReactSVG className="h-full w-full flex justify-center" src="/icons/discord-button.svg" />
                  <div className="h-1 w-1/2 bg-orange rounded-md drop-shadow-orange absolute mt-[54px]"/>
               </div>
           </Link>

            <div className="relative z-10 translate-y-12 animate-pulse">
                <Link href="/">
                    <Image
                        className="mx-4"
                        src={'/img/logo.png'}
                        width={325}
                        height={316}
                        quality={100}
                        alt="Logo"
                    />
                </Link>
            </div>

            <Link
                href={settings.discord_url}
                className="-mt-20 hidden items-center gap-2 transition duration-300 hover:scale-110 lg:flex flex-row-reverse font-semibold translate-y-20"
            >
                <div className="ml-0.5 flex-col">
                    <span className="text-base font-bold text-orange">
                        {t('discord-server')}
                    </span>
                    <span className="text-sm text-white/75">
                        {discordOnline} {t('members-online')}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center relative">
                   <ReactSVG className="h-full w-full flex justify-center" src="/icons/discord-button.svg" />
                   <div className="h-1 w-1/2 bg-orange rounded-md drop-shadow-orange absolute mt-[54px]"/>
                </div>
            </Link>
        </div>
    );
};
