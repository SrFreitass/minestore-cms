import { FC } from 'react';
import { TCategories } from '@/types/categories';
import { TSettings } from '@/types/settings';
import { CategoryMenu } from './parts/category-menu/category-menu';
import { ExtraWidget } from './parts/extra-widget/extra-widget';
import { TAvalation } from '@/types/avaliation';

type SidebarProps = {
    settings: TSettings;
    categories: TCategories;
    avalations: TAvalation[];
};

export const Sidebar: FC<SidebarProps> = ({ settings, categories, avalations }) => {
    return (
        <div className="w-full flex-col lg:w-[320px] xl:w-[400px]">
            <CategoryMenu categories={categories}/>
            <ExtraWidget settings={settings} avalations={avalations} />
        </div>
    );
};
