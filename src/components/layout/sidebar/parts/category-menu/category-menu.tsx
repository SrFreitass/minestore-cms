'use client';

import { useSettingsStore } from '@/stores/settings';
import { TCategories } from '@/types/categories';
import { getCacheBuster } from '@helpers/cache-buster';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { MenuItem } from './components/menu-item';

type CategoryMenuProps = {
    categories: TCategories;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
    const t = useTranslations('sidebar');
    const { settings } = useSettingsStore();
    const cacheBuster = getCacheBuster();

    return (
        <aside className="h-fit rounded-[10px] bg-card p-6 border-border border">
            <ul className="space-y-3">
                <h2 className='font-bold text-2xl text-orange'>Explorar agora</h2>
                {categories.map((category) => (
                    <MenuItem
                        key={category.idx}
                        name={category.name}
                        // Mock
                        // image={imagePath(category.img) ? `${imagePath(category.img)}?${cacheBuster}` : null}
                        image={category.img}
                        url={`/categories/${category.url}`}
                        subItems={category?.subcategories}
                    />
                ))}

                {settings?.header.map((item) => (
                    <MenuItem
                        key={item.id}
                        name={item.name}
                        image={item.icon}
                        url={item.url}
                        isPageLink={true}
                    />
                ))}
            </ul>
        </aside>
    );
};
