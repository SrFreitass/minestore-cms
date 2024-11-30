import { AxiosInstance } from 'axios';
import { TAnnouncement } from '@/types/announcement';
import { TAvalation } from '@/types/avaliation';

type ReturnType = TAvalation[];

export const getAvalations = (fetcher: AxiosInstance) => async () => {
    const url = '/avaliations/get';
    // return (await fetcher.get<ReturnType>(url)).data;

    const mockData = [
        {
            id: 1,
            username: 'Notch',
            stars: 5,
            description: 'Muito bom o servidor, curti demais.',
        },
        {
            id: 2,
            username: 'Fulano',
            stars: 4,
            description: 'Muito bom o servidor, curti demais.',
        },
        {
            id: 3,
            username: 'Ciclano',
            stars: 5,
            description: 'Muito bom o servidor, curti demais.',
        }
    ];

    return mockData;

};
