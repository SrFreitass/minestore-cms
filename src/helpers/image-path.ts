export const imagePath = (path: string) => {
    let image = path.replace(process?.env?.NEXT_PUBLIC_API_URL || '', '');
    image = image.replace(/\?.*$/, "")

    return image;
};
