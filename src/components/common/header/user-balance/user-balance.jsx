'use client';
import { Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const formateNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
};

const UserBalance = () => {
     const { balance } = useSelector((state) => state.balance);
   
    const balanceLength = formateNumber(balance)?.length;
    const balanceMaxLength = 12;

    const balanceInfo = (
        <div className="header_btn">
            <div className="btn_img">
                <Image src="/images/icons/balance.svg" height={28} width={28} alt="balance icon" />
            </div>

            <div className="btn_content">
                <span className="btn_label">Balance</span>
                <span className="btn_text">{balanceLength > balanceMaxLength ? `${formateNumber(balance)?.slice(0, balanceMaxLength)}...` : formateNumber(balance)}</span>
            </div>
        </div>
    );
    return (
        <>
            {balanceLength > balanceMaxLength ? (
                <Tooltip label={formateNumber(balance)} arrowOffset={50} arrowSize={10} withArrow position="bottom">
                    {balanceInfo}
                </Tooltip>
            ) : (
                balanceInfo
            )}
        </>
    );
};

export default UserBalance;
