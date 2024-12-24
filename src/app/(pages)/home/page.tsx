import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { Content } from './components/content';

const { getFeaturedDeals, getSettings } = getEndpoints(fetcher);

export default async function Home() {
    const settings = await getSettings();

    return (
        <>
            <div className="flex-col rounded-[10px] bg-card border-border border">
                <div className="p-4">
                    <Content />
                </div>

            </div>
        </>
    );
}
