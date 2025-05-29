import clsx from 'clsx';
import style from './game-modal.module.scss';
import { Loader, Modal } from '@mantine/core';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useFullscreen } from '@mantine/hooks';
import { useOs } from '@mantine/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import StatusMsg from '../status-msg';
import { fetchBalanceApi } from '@/lib/features/balance/balanceSlice';
import { useDispatch, useSelector } from 'react-redux';

function GameModal({ children, modalOpened, modalClose, gameData, loading, error }) {
    const { toggle, fullscreen } = useFullscreen();
    const { xsDevice } = useBreakpoints();
    const OS = useOs();
    const router = useRouter();
    const dispatch = useDispatch();
    const { remoteId } = useSelector((state) => state.session);

    function toCapitalize(data) {
        if (!data || typeof data !== 'string') return '';
        return data.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    }

    const updateBalanceData = () => {
        dispatch(fetchBalanceApi(remoteId));
    };
    const redirectUrl = () => {
        router.push(`/provider/${slugify(gameData?.providerKey || gameData?.providerName, { lower: true })}`);
        modalClose();
        updateBalanceData();
    };

    const closeModal = () => {
        updateBalanceData();
        modalClose();
    };

    const redirectHome = () => {
        router.push(`/`);
        modalClose();
        updateBalanceData();
    };

    // Check if OS is macOS or iOS to hide fullscreen button
    const showFullscreenButton = OS !== 'macos' && OS !== 'ios';

    return (
        <Modal opened={modalOpened} fullScreen radius={0} transitionProps={{ transition: 'fade', duration: 200 }} withCloseButton={false} className={clsx(style.game_modal, '🧔')}>
            <div className={style.iframe_wp}>
                <div className={style.modal_header}>
                    <div className={style.game_info}>
                        {gameData.name && (
                            <h6 className={style.game_name}>
                                {/* <Icon icon="ri:dice-line" width={18} /> */}
                                {gameData.name}
                            </h6>
                        )}
                        <div className={style.game_extra_info}>
                            {gameData.providerName && (
                                <button onClick={() => redirectUrl()} title="Provider Name">
                                    <Icon icon="mdi:company" width={18} />
                                    {gameData.providerName}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={style.action_btns}>
                        <button title="Home Page" className={style.btn} onClick={redirectHome}>
                            <Icon icon="ic:round-home" width={20} />
                        </button>

                        {showFullscreenButton && (
                            <button type="button" className={style.btn} onClick={toggle}>
                                <Icon icon={fullscreen ? 'ri:fullscreen-exit-fill' : 'ri:fullscreen-fill'} width={18} />
                            </button>
                        )}

                        <button type="button" onClick={closeModal} className={style.btn}>
                            <Icon icon="pajamas:close-xs" width={24} />
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className={style.iframe_box}>
                        <Loader color="white" size={40} />
                    </div>
                ) : error?.message ? (
                    <div className={style.iframe_box}>
                        <StatusMsg title={error?.message} variant={error?.variant} />
                    </div>
                ) : (
                    children
                )}
            </div>
        </Modal>
    );
}

export default GameModal;
