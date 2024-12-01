import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { Container } from '@/components/base/container/container';
import { AuthProvider } from '@/core/auth/auth-provider';
import { getDictionary } from '@/core/i18n';
import { LocaleProvider } from '@/core/i18n/locale-provider';
import { Init } from '@/core/init/init';
import { extractConfigValue } from '@helpers/extract-config-value';
import { langStorage } from '@helpers/lang-storage';
import { Footer } from '@layout/footer/footer';
import { Header } from '@layout/header/header';
import { Sidebar } from '@layout/sidebar/sidebar';
import { promises as fs } from 'fs';
import { FC, PropsWithChildren, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from './providers/config-provider';
import { ThemeProvider } from './providers/theme-provider';

const { getUser, getSettings, getCategories, getAvalations } = getEndpoints(fetcher);

export const App: FC<PropsWithChildren> = async ({ children }) => {
    const settings = await getSettings();
    const categories = await getCategories();
    const avalations = await getAvalations().catch(() => undefined);

    const user = await getUser().catch(() => undefined);

    const messages = await getDictionary(langStorage.get() || 'en');

    const file = await fs.readFile(process.cwd() + '/config.json', 'utf8');
    const data = JSON.parse(file);

    const defaultTheme = extractConfigValue('theme', data) || ('system' as string);
    const particles = extractConfigValue('particles', data) || ('Enabled' as string);

    const systemLanguage = settings.system_language.code || 'en';

    return (
        <ConfigProvider config={data}>
            <ThemeProvider
                attribute="class"
                defaultTheme={defaultTheme}
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider initialUser={user}>
                    <LocaleProvider initialMessages={messages} systemLanguage={systemLanguage}>
                        <Suspense>
                            <Header settings={settings} particles={particles} />
                            <Container className="mt-4 flex-col items-start gap-5 lg:flex-row">
                                <Sidebar settings={settings} categories={categories} avalations={avalations || []}/>
                                <main className="w-full flex-1 overflow-x-auto">{children}</main>
                            </Container>
                            <Footer settings={settings} />
                            <Init settings={settings} />
                            <Toaster position="top-right" reverseOrder={false} toastOptions={{
                                custom: {
                                    style: {
                                        background: '#333',
                                        color: '#fff',
                                    }
                                },
                                style: {
                                    background: '#333',
                                    color: '#fff',
                                },
                                success: {
                                    duration: 5000,
                                },
                                error: {
                                    duration: 5000,
                                },
                            }} 
                            />
                        </Suspense>
                    </LocaleProvider>
                </AuthProvider>
            </ThemeProvider>
        </ConfigProvider>
    );
};
