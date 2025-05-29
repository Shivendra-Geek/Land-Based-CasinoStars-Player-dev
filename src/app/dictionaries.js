// import 'server-only';
import { locales } from '@/config/locales';
import axios from 'axios';

const fetchTranslations = async (locale, isAdmin) => {
    const data = await axios
        .get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/casinos/${isAdmin ? 'admin-' : ''}translation?token=${
                process.env.NEXT_PUBLIC_TOKEN
            }&casino=${process.env.NEXT_PUBLIC_CASINO}&languageCode=${locale || 'en'}&pageKey=`
        )
        .then((response) => {
            if (response?.data?.status === 200) {
                return response?.data?.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return data;
};

export const getDictionary = async (locale, isAdmin) => {
    if (!locales.includes(locale)) {
        locale = 'en';
    }

    return await fetchTranslations(locale, isAdmin);
};
