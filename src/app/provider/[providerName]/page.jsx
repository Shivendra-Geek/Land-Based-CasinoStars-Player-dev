'use client';
import Banner from '@/components/pages/home/banner';
import Providers from '@/components/pages/home/providers';
import Games from '@/components/pages/home/games';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import slugify from 'slugify';
import { useSelector } from 'react-redux';

export default function Home() {
    const pathname = usePathname();
    const [allGameError, setAllGameError] = useState('');
    const [allGameData, setAllGameData] = useState([]);
    const [allProviders, setAllProviders] = useState([]);
    const [gameTypeData, setGameTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { providerName } = useParams();
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedGameType, setSelectedGameType] = useState('');
    const [currentGameCount, setCurrentGameCount] = useState(0);
    const [page, setPage] = useState(1);
    const { remoteId } = useSelector((state) => state.session);
    const gamesSectionRef = useRef(null);

    const fetchGames = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/games/admin/getAllCombineAPI?action=available_games&token=${process.env.NEXT_PUBLIC_TOKEN}&casino=${process.env.NEXT_PUBLIC_CASINO}&page=${page}&provider=${selectedProvider}&gameType=${selectedGameType}&remoteId=${remoteId}`;

        try {
            setLoading(true);
            const response = await axios.get(url);
            const providers = response?.data?.providers || [];
            const gameTypes = response?.data.gamesTypes || [];
            const newGames = response?.data?.availableGames?.games || [];
            providers?.map((providerObject) => {
                if (slugify(providerName, { lower: true }) === slugify(providerObject?.key, { lower: true })) {
                    setSelectedProvider(providerObject?.providerId);
                }
            });
            if (!selectedGameType) {
                setGameTypeData(gameTypes);
            }
            if (!selectedProvider) {
                setAllProviders(providers);
            }
            if (selectedProvider) {
                setAllGameData((prevGames) => (page === 1 ? newGames : [...prevGames, ...newGames]));
                setCurrentGameCount(response?.data?.availableGames?.currentGamesCount);
            }
        } catch (error) {
            setAllGameError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [selectedProvider, selectedGameType]);

    useEffect(() => {
        fetchGames();
    }, [selectedProvider, selectedGameType, page, remoteId]);

    useEffect(() => {
        if (gamesSectionRef.current && allGameData.length > 0 && !loading) {
            // Option 1: Instant scroll (no animation)
            gamesSectionRef.current.scrollIntoView({ behavior: 'auto' });
        }
    }, [allGameData, loading]);

    return (
        <>
            <main>
                <Banner />
                <Providers data={allProviders} error={allGameError} setSelectedProvider={setSelectedProvider} />
                <div ref={gamesSectionRef}>
                    <Games
                        data={allGameData}
                        error={allGameError}
                        gameTypeData={gameTypeData}
                        setSelectedGameType={setSelectedGameType}
                        currentGameCount={currentGameCount}
                        page={page}
                        setPage={setPage}
                        loading={loading}
                    />
                </div>
            </main>
        </>
    );
}
