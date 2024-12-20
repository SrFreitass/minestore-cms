'use client';

import { useLangStore } from '@/stores/lang';
import { NextIntlClientProvider } from 'next-intl';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { getDictionary } from '.';

interface LocaleProviderProps {
    children: React.ReactNode;
    initialMessages: Record<string, string>;
    systemLanguage: string;
}

export const LocaleProvider: FC<LocaleProviderProps> = ({
    children,
    initialMessages,
    systemLanguage
}) => {
    const { lang, setLang } = useLangStore();

    const [messages, setMessages] = useState(initialMessages);
    const [isMounted, setIsMounted] = useState(false);

    if (!lang) {
        setLang("br");
    }

    useLayoutEffect(() => {
        const load = async () => {
            try {
                const messages = await getDictionary("br");
                setMessages(messages);
            } catch (err) {
                console.error('Error loading dictionary', err);

                const messages = await getDictionary('br');
                setMessages(messages);
            }
        };

        load();
    }, [lang]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <NextIntlClientProvider locale={lang} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};
