import clsx from 'clsx';
import style from './live-chat.module.scss';
import Image from 'next/image';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const LiveChat = () => {
    const { xsDevice } = useBreakpoints();

    // const handleShowChat = () => {
    //     if (window.Tawk_API) {
    //         window.Tawk_API.maximize();
    //     }
    // };

    return (
        <>
            {/* {xsDevice ? ( */}
            <button className={clsx(style.live_chat, 'theme_btn gradient_border scale-effect')} onClick={handleShowChat}>
                <span>Live Chat</span>
            </button>
            {/* ) : ( */}
            {/* <button className={style.live_chat} onClick={handleShowChat}>
                         <Image src='/images/icons/live-chat.svg' height={23} width={23} alt='Live chat icon' />
                    </button> */}
            {/* )} */}
        </>
    );
};

export default LiveChat;
