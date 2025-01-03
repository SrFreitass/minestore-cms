import { joinClasses } from '@helpers/join-classes';

type CardLayoutProps = {
    children: React.ReactNode;
    direction?: 'row' | 'col';
    className?: string;
};

export function CardLayout({ children, direction, className }: CardLayoutProps) {
    const classes = joinClasses(
        'rounded-md border bg-royal-sec p-4',
        direction === 'col' && 'flex flex-col gap-4 min-h-[311px] h-full',
        direction === 'row' && 'flex-col md:flex-row gap-4 justify-between',
        className
    );

    return <div className={classes}>{children}</div>;
}
