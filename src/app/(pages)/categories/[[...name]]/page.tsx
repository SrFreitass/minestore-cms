import { fetcher } from '@/api/server/fetcher';
import { getEndpoints } from '@/api';
import { joinClasses } from '@helpers/join-classes';
import { Alert } from '@layout/alert/alert';
import { TCategory, TSubCategory } from '@/types/category-details';
import { Comparison } from '../comparison/comparasion';
import { TItem } from '@/types/item';
import { Card } from '@layout/card/card';
import { Suspense } from 'react';
import { SkeletonCategory } from '../components/skeleton-category';

const { getCategoryDetails } = getEndpoints(fetcher);

type TCategoryHeader = {
    category: TCategory;
    subCategory?: TSubCategory;
};

type TProductListContainer = {
    items: TItem[];
    category: TCategory;
    subcategory?: TSubCategory;
};

export default async function Page({ params }: { params: { name: string[] } }) {
    const [categoryPath] = params.name;

    const response = await getCategoryDetails(categoryPath).catch((error) => {
        console.error('Error fetching category details:', error);
        return undefined;
    });

    if (!response) {
        return <ProductListContainer 
        category={{
            name: 'Sample Category',
            description: 'Sample Category Description',
            is_comparison: false,
            is_listing: false
        }}  
        items={[
            {
                name: 'Cash',
                price: 30,
                discount: 70,
                active: true,
                is_subs: false,
                custom_price: 0,
                min_price: 10,
                image: 'https://s3-alpha-sig.figma.com/img/2874/1ddf/9f1047362f895c3d652b8d097115aa70?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E38EIiZqZhpT5s89Thr5GMEMKD31H4riafoUHnFr3S6zO5A0fuSsFVio7rorwIi4A5hCQLb-a61EbZYtSai8DQUxJLZ72rOQTXu1QoB37wpMHbq5t2AS0QWrKhNaSKdmcHMEf2a~4tfUFsueiv3hsrKhgKTS5gg~3Y4ujU7KH51yyKdSje-GFI3vihavpTar77ujOGIFEuDYSVq44HNVGsEWFST8NCkiVmUQgjC8MObob1a6JvznfPhU83f2rEJd4DCRdGx1W9yc8ryD4RyQRxYLPBLtJ71tLH-uShlNJDw4Q2XGT3prdcS8BW~qjO-DyFBPpmy8FDDS2I8GaWf9yQ__',
                id: 1,
                featured: false,
                is_unavailable: false,
                last_units: 5,
            }
        ]}/>;
    }

    const { category, items, subcategories } = response;

    const subCategory = subcategories?.find((x) => x.category.url === params.name.join('/'));

    const isComparison = subCategory?.category.is_comparison || category.is_comparison;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            description: item.description
        }))
    };

    return (
        <div className="w-full flex-col rounded-[10px] bg-card">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Suspense fallback={<SkeletonCategory />}>
                <CategoryHeader category={category} subCategory={subCategory} />

                {isComparison ? (
                    <Comparison
                        categoryItems={items}
                        category={category}
                        subCategory={subCategory}
                    />
                ) : (
                    <ProductListContainer
                        items={items}
                        category={category}
                        subcategory={subCategory}
                    />
                )}
            </Suspense>
        </div>
    );
}

function CategoryHeader({ category, subCategory }: TCategoryHeader) {
    const title = subCategory?.category.name || category.name;
    const description = subCategory?.category.description || category.description;

    return (
        <div className="w-full flex-col p-4">
            <Alert />

            <h1 className="mt-4 text-center text-[34px] text-primary">{title}</h1>
            <span
                className="text-center text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
            />

            <hr className="mt-5 border-[3px] border-primary" />
        </div>
    );
}

function ProductListContainer({ items, category, subcategory }: TProductListContainer) {
    const categoryItems = subcategory?.items || items;
    const categoryListing = subcategory?.category.is_listing || category.is_listing;

    const gridClasses = joinClasses('mt-8 grid gap-4 p-4', {
        'grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))]': !categoryListing
    });

    return (
        <div className={gridClasses}>
            {categoryItems.map((item, index) => (
                <Card
                    key={index}
                    item={item}
                    direction={'col'}
                    className={joinClasses({ 'w-full': categoryListing })}
                />
            ))}
        </div>
    );
}
