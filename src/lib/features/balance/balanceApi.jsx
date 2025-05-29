
import { generateAuth, generateUrlSearchParams } from '@/lib/utils/generate-url-params';
import axios from 'axios';

export const getBalance = async (remoteId) => {
    try {
        if (!remoteId) {
            return {
                userDefaultCurrency: { currencyAbrv: 'USD', currencyName: 'United States Dollar' },
                isUser: false,
                loading: false,
            };
        }

        if (remoteId) {
            const authkey = generateAuth(
                `action=balance&remote_id=${remoteId}&token=${process.env.NEXT_PUBLIC_TOKEN}&casino=${process.env.NEXT_PUBLIC_CASINO}`
            );

            // Set the query parameters
            const queryString =generateUrlSearchParams({
                action: 'balance',
                remote_id: remoteId,
                token: process.env.NEXT_PUBLIC_TOKEN,
                casino: process.env.NEXT_PUBLIC_CASINO,
                authKey: authkey,
            }).toString();

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/casinos-admin/api?${queryString}`);

            if (response.data?.status === 200) {
                return {
                    balance: response.data?.balance,
                    points: response.data?.pointsBalance[0]?.points,
                    balanceArr: response.data?.balanceArr,
                    userDefaultCurrency: response.data?.currencyObj,
                    currency: response.data?.currency,
                    rollover: response.data?.rollover,
                    bonus: response.data?.bonus,
                    isUser: true,
                };
            } else {
                // Handle non-200 response statuses
                return {
                    balance: 0,
                    points: 0.0,
                    balanceArr: [],
                    userDefaultCurrency: { currencyAbrv: 'USD', currencyName: 'United States Dollar' },
                    isUser: true,
                };
            }
        }
    } catch (error) {
        // Log the error or handle it as needed
        console.error('Failed to fetch balance:', error);

        // Return a default value or handle error state
        return {
            userDefaultCurrency: { currencyAbrv: 'USD', currencyName: 'United States Dollar' },
            isUser: true,
        };
    }
};
