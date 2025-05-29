'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './provider-box.module.scss'; // Renamed to 'styles' (conventional)

const ProviderBox = ({ image, alt, setSelectedProvider, provider, providerLink, providerName }) => {
    // if (!image || !alt) {
    //     return null;
    // }

    const handleProviderSelection = () => {
        if (setSelectedProvider) {
            setSelectedProvider(provider);
        }
    };

    return (
        
        <Link href={providerLink} className={styles.provider_box}>
            <button onClick={handleProviderSelection} className={styles.button}>
               { !image ? <span>{providerName}</span> :<Image src={image} alt={alt} width={160} height={160} priority />} 
            </button>
        </Link>
    );
};

export default ProviderBox;
