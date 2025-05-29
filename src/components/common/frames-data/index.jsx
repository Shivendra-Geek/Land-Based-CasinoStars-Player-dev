'use client';
import { Fancybox } from '@fancyapps/ui';
import Image from 'next/image';
import { useEffect } from 'react';
import ActionBtn from '../table/action-btn';

const FramesData = ({ images, shareEnable = false }) => {
    useEffect(() => {
        Fancybox.bind('[data-fancybox^="frames-gallery"]', {
            Thumbs: {
                autoStart: true,
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, []);

    const handleOpenGallery = () => {
        document.querySelector(`[data-fancybox="frames-gallery-${images[0]?.id}"]`)?.click();
    };

    return (
        <>
            <div className={'action_btn_wp'}>
                <ActionBtn icon="/images/icons/frames.svg" title="Videos" onClick={handleOpenGallery} />
                {shareEnable && (
                    <button>
                        <Image src={'/images/icons/share.svg'} height={18} width={18} alt="share icon" />
                    </button>
                )}
            </div>
            <div style={{ display: 'none' }}>
                {images.map((image) => (
                    <a key={image.id} href={image.url} data-fancybox={`frames-gallery-${images[0]?.id}`} data-caption={image.caption}>
                        <img src={image.url} alt={image.caption} />
                    </a>
                ))}
            </div>
        </>
    );
};

export default FramesData;
