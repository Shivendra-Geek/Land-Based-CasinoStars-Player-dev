'use client';
import { Container, Skeleton } from '@mantine/core';
import clsx from 'clsx';
import style from './providers.module.scss';
import ProviderBox from '@/components/common/provider-box';
import slugify from 'slugify';
import StatusMsg from '@/components/common/status-msg';

const Providers = ({ data, error, setSelectedProvider, provider, loading }) => {
    // if (data.length === 0) return;

    return (
        <section className={clsx(style.providers)}>
            <Container>
                {loading && data.length === 0 ? (
                    <div className={style.providers_wp}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton style={{ height: 'clamp(5rem, 4.125rem + 4.375vw, 9.375rem)' }} radius="lg" key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <StatusMsg message={error || 'An unexpected error has occurred'} />
                ) : (
                    <div className={style.providers_wp}>
                        {data.length > 0 &&
                            data.map((provider, i) => (
                                <ProviderBox
                                    key={i}
                                    provider={provider?.providerId}
                                    image={provider?.logoURL || provider?.image || ''}
                                    alt={'provider image'}
                                    setSelectedProvider={setSelectedProvider}
                                    providerLink={`/provider/${slugify(provider?.key, { lower: true })}`}
                                    providerName={provider?.name}
                                />
                            ))}
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Providers;
