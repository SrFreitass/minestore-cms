export const imagePath = (path: string) => {
    const image = path.replace(process?.env?.NEXT_PUBLIC_API_URL || '', '');

    return image;
};
