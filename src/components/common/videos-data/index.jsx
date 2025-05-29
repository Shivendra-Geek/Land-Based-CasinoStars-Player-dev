'use client';
import { Fancybox } from '@fancyapps/ui';
import Image from 'next/image';
import { useEffect } from 'react';
import ActionBtn from '../table/action-btn';

const VideosData = ({ videos, uniqueId, shareEnable = false }) => {
    useEffect(() => {
        Fancybox.bind(`[data-fancybox="videos-gallery-${uniqueId}"]`, {
            Thumbs: {
                autoStart: true,
            },
            Toolbar: {
                display: ['close', 'fullscreen', 'thumbs', 'zoom'],
            },
            Video: {
                autoStart: true,
                quality: 'auto',
                controls: true,
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, [uniqueId]);

    const handleOpenGallery = () => {
        document.querySelector(`[data-fancybox="videos-gallery-${uniqueId}"]`)?.click();
    };

    return (
        <>
            <div className={'action_btn_wp'}>
                <ActionBtn icon="/images/icons/videos.svg" title="Videos" onClick={handleOpenGallery} />
                {shareEnable && (
                    <button>
                        <Image src={'/images/icons/share.svg'} height={18} width={18} alt="share icon" />
                    </button>
                )}
            </div>
            <div style={{ display: 'none' }}>
                {videos.map((video) => (
                    <a key={video.id} href={video.url} data-fancybox={`videos-gallery-${uniqueId}`} data-caption={video.caption}>
                        {video.caption}
                    </a>
                ))}
            </div>
        </>
    );
};

export default VideosData;
