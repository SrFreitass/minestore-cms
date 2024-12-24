'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TAvalation } from '@/types/avaliation';
import { TSettings } from '@/types/settings';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UserReview } from './user-review';



const { getAvalations } = getEndpoints(fetcher);

type ExtraWidgetProps = {
    settings: TSettings;
    avalations: TAvalation[];
};

export const ExtraWidget: FC<ExtraWidgetProps> = ({ settings, avalations }) => {
    

    return (
        <>
            <div className="mt-4 hidden w-full rounded-[10px] bg-card p-8 lg:block border-border border">
                <h2 className='text-orange font-extrabold text-2xl text-center'>Avaliações</h2>

                <Swiper 
                    navigation
                    modules={[Navigation]}
                    
                > 
                   {
                     avalations.map((avalation) => {
                        return (
                            <SwiperSlide>
                                {/* <Link href={`/profile/${avalation.username}`}> */}
                                <UserReview username={avalation.username} stars={avalation.stars} description={avalation.description}/>
                                {/* </Link>  */}
                            </SwiperSlide>
                        )
                     })
                   }
                </Swiper>
            </div>
        </>
    );
};
