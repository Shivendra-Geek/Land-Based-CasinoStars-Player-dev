import Image from 'next/image';
import style from './send-to-support.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { generateUrlSearchParams } from '@/lib/utils/generate-url-params';
import { errorMsg, successMsg } from '@/app/component/toastify-msg';

const SendToSupport = ({ requestType, roundId, transactionId, creatorId }) => {
    const [loading, setLoading] = useState(false);
    const handleSendToSupport = async () => {
        setLoading(true);
        const params = generateUrlSearchParams({
            casino: process.env.NEXT_PUBLIC_CASINO,
            status: 'Pending',
            request_type: requestType,
            ...(requestType == 'game' && { round_id: roundId }),
            ...(requestType == 'transaction' && { transaction_id: transactionId }),
            creator_id: creatorId,
        });

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/support-requests/create?${params?.toString()}`);
            if (response.data.status === 200) {
                successMsg(response?.data?.message);
            } else {
                errorMsg(response?.data?.message);
            }
        } catch (error) {
            errorMsg(error?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={style.support_btn_wp}>
            <button>
                <Image src={'/images/icons/share.svg'} height={18} width={18} alt="share icon" />
            </button>
            <Button className="theme_btn primary_btn btn_es" style={{ minWidth: '10rem' }} onClick={() => handleSendToSupport()} loading={loading}>
                Send to support
            </Button>
        </div>
    );
};

export default SendToSupport;
