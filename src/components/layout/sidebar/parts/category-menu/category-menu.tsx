'use client';

import { FC } from 'react';
import { MenuItem } from './components/menu-item';
import { TCategories } from '@/types/categories';
import { useTranslations } from 'next-intl';
import { imagePath } from '@helpers/image-path';
import { useSettingsStore } from '@/stores/settings';
import { getCacheBuster } from '@helpers/cache-buster';

type CategoryMenuProps = {
    categories: TCategories;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
    const t = useTranslations('sidebar');
    const { settings } = useSettingsStore();
    const cacheBuster = getCacheBuster();

    return (
        <aside className="h-fit rounded-[10px] bg-card p-6 border-border border-2">
            <ul className="space-y-8">
                

                {categories.map((category) => (
                    <MenuItem
                        key={category.idx}
                        name={category.name}
                        // Mock
                        // image={imagePath(category.img) ? `${imagePath(category.img)}?${cacheBuster}` : null}
                        image={category.img}
                        url={`/categories/${category.url}`}
                        subItems={category.subcategories}
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
