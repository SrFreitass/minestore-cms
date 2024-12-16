'use client';

import { Price } from '@/components/base/price/price';
import { TProfile } from '@/types/profile';
import { Card } from '@layout/card/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

type ProfileViewProps = {
   profile: TProfile;
};

const renderDisplayText = (content: string) => {
   const isHtml = /<\/?span[^>]*>/.test(content);

   if (isHtml) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
   }

   return <div>{content}</div>;
};

export const ProfileView: FC<ProfileViewProps> = ({ profile }) => {
   const t = useTranslations('profile');

   return (
      <div className="flex-col rounded-[10px] bg-card p-6 pb-0  w-[40rem]">
            <h2 className="text-2xl font-bold text-start">
               <span className='text-white'>{t('title')}</span> <span className='text-orange text-2xl font-bold'>{profile.username}</span>
            </h2>


         <div className="mt-8 flex-row items-end relative">
            <div className="w-1/2 flex-col items-start z-10">
               <Image
                  src={`https://mc-heads.net/body/${profile.username}`}
                  height={475}
                  width={198}
                  alt={profile.username}
                  quality={100}
               />
            </div>
            <div className="w-full flex-col rounded-lg p-6 pl-48 absolute bg-[#101010]">
               <div className='flex flex-col gap-2 text-xl'>
                  <div className='flex gap-2 items-center'>
                     <ReactSVG src='/icons/control-game.svg'/>
                     <span className="font-medium text-white">
                        {t('registration-date')}
                     </span>
                     <span className='font-semibold text-green-400'>{profile?.created?.split('.')[0]}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                     <ReactSVG src='/icons/control-game.svg'/>
                     <span className="font-medium text-white">
                        {t('money-spent')}
                     </span>
                     <Price value={profile.money_spent} className="font-semibold"/>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-8 grid grid-cols-3 gap-8">
            {profile?.items?.length <= 0 && profile?.items?.map((item, index) => <Card key={index} item={item} hideButton={true}/>)}
         </div>

         {profile?.items?.length === 0 && (
            <div className="text-center text-muted-foreground">
               No recent purchases found for this user.
            </div>
         )}
      </div>
   );
};
