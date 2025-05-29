'use client';
import Image from 'next/image';
import style from './game-box.module.scss';
import clsx from 'clsx';
import gameImg from '@/images/logo/logo-light.svg';
import { useEffect, useRef, useState } from 'react';
import { providerIds } from '@/lib/utils/provider-id-data';
import axios from 'axios';
import { generateUrlSearchParams } from '@/lib/utils/generate-url-params';
import { useSelector } from 'react-redux';
import GameModal from '../game-modal';
import { useDisclosure } from '@mantine/hooks';
import StatusMsg from '../status-msg';

const GameBox = ({ data }) => {
    const [imgSrc, setImgSrc] = useState(data.gameIcon || '/images/game-placeholder.jpg');
    const [gameUrl, setGameUrl] = useState('');
    const { remoteId, userId } = useSelector((state) => state.session);
    const [opened, { open, close }] = useDisclosure(false);
    const [error, setError] = useState({ message: '', variant: '' });
    const [loading, setLoading] = useState(false);

    const getGameUrl = async (data, currency) => {
        let isAdditionalParams = true;
        let gameUrl = '';
        let gamePlayUrl = '';
        const gameId = Number.parseInt(data.providerId) === 1 ? data?.providerGameId : data?.id;
        const baseUrl = data?.serverUrl;
        setLoading(true);

        //    if (mode === 'offline') {
        //        setLoading({ [id]: true });
        //    } else {
        //        setLoadingMoney({ [id]: true });
        //    }
        // Common query params
        const params = generateUrlSearchParams({
            action: 'gameLoad',
            token: process.env.NEXT_PUBLIC_TOKEN,
            casino: process.env.NEXT_PUBLIC_CASINO,
            game_id: gameId,
            currency: currency,
            language: 'en',
            mode: 'online',
            redirectUrl: window?.location?.href,
            depositUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/my-account/deposit`,
            remote_id: userId,
        });

        try {
            if (providerIds?.includes(Number(data?.providerId))) {
                const url = `${baseUrl}?${params}`;
                const response = await axios.get(url);
                if (response?.data?.isSetAdditionalParams === false) {
                    isAdditionalParams = response?.data?.isSetAdditionalParams;
                }

                if (response.data?.status === 200) {
                    gameUrl = response.data?.result;
                    if (response.data?.resultScript) {
                        gameUrl = response.data?.resultScript;
                        //     renderScript(gameUrl, screen);
                    } else if (!gameUrl) {
                        setError({ message: 'Missing game launch URL', variant: 'danger' });
                    }
                    // setTimeout(() => {
                    //     updateBalanceData();
                    // }, 10000);
                } else {
                    const errorMsg = response.data?.response || response.data?.message;
                    setError({ message: errorMsg, variant: 'danger' });
                    // if (settingErrorMessage) settingErrorMessage(errorMsg, id);
                }
            } else {
                const url = `${baseUrl}?${params.toString()}`;
                const response = await axios.get(url);
                if (response.data?.status) {
                    const token = response.data?.result;
                    const serverUrl = response.data?.serverUrl;
                    const gameParams = new URLSearchParams({
                        token: data?.providerSecret,
                        casino: data?.partnerClientId,
                        language: 'en',
                        currency: currency,
                        session_id: token,
                        game_id: data?.providerGameId,
                        server: serverUrl,
                        remote_id: remoteId,
                    });
                    gameUrl = `${data?.gameUrl}?${gameParams.toString()}`;
                    // setTimeout(() => {
                    //     updateBalanceData();
                    // }, 10000);
                } else {
                    const errorMsg = response.data?.response;
                    setError({ message: errorMsg, variant: 'danger' });
                    // if (settingErrorMessage) settingErrorMessage(errorMsg, id);
                }
            }
        } catch (error) {
            const errorMsg = error.message;
            //   if (settingErrorMessage) settingErrorMessage(errorMsg);
            setError({ message: errorMsg, variant: 'danger' });
        } finally {
            //   setLoading({ [id]: false });
            //   setLoadingMoney({ [id]: false });
            setLoading(false);
        }

        if (gameUrl && !gameUrl?.gameScript) {
            const depositParam = !isAdditionalParams ? '' : `deposit=${process.env.NEXT_PUBLIC_SITE_URL}/my-account/deposit/`;
            gamePlayUrl = gameUrl.includes('?') ? `${gameUrl}&${depositParam}` : `${gameUrl}?${depositParam}`;
        }
        if (gameUrl?.gameScript) {
            return gameUrl;
        }
        return gamePlayUrl;
    };

    const playGame = async (data) => {
        //    if (!isLoggedIn && !reduxLoading) {
        //        setModalShow(true);
        //        return;
        //    } else if (data[screen]?.providerName?.toLowerCase() === 'fortune panda' && !playFortunePandaGame) {
        //        setWalletModal(true);
        //        await getGameBalance(data[screen]?.id);
        //        setFortunePandaBalance((prev) => ({ ...prev, ...data[screen] }));
        //        return;
        //    }
        const url = await getGameUrl(data, 'USD');
        setGameUrl(url);
        if (data?.[screen]?.providerId === 333) {
            window.open(url, '_blank');
        }

        //    toggle();
        //    if (settingGameUrl) settingGameUrl(url, id);
        //    intervalId = setInterval(() => {
        //        updateBalanceData();
        //    }, 7000);
    };

    console.log(data, 'data');

    return (
        <>
            <GameModal modalOpened={opened} modalClose={close} gameData={data} loading={loading} error={error}>
				<iframe src={gameUrl} height={'100%'} width={'100%'} title="Game Iframe" />
            </GameModal>

            <button
                type="button"
                className={clsx(style.game_box)}
                onClick={() => {
                    playGame(data);
                    open();
                }}
            >
                <div className={style.box_image}>
                    <div className={style.image}>
                        <Image src={imgSrc} height={200} width={200} alt="game image" onError={() => setImgSrc(gameImg)} />
                    </div>
                </div>
                <div className={style.box_content}>
                    <h6 className={style.title}>{data.name}</h6>
                    <span className={style.provider_name}>{data.providerName}</span>
                </div>
            </button>
        </>
    );
};

export default GameBox;
