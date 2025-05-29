'use client';
import Banner from '@/components/pages/home/banner';
import style from './home.module.scss';
import Providers from '@/components/pages/home/providers';
import Games from '@/components/pages/home/games';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { check } from '@tauri-apps/plugin-updater';
import { ask, message } from '@tauri-apps/plugin-dialog';
import { useSelector } from 'react-redux';


export default function Home() {
    const [allGameError, setAllGameError] = useState('');
    const [allGameData, setAllGameData] = useState([]);
    const [allProviders, setAllProviders] = useState([]);
    const [gameTypeData, setGameTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedGameType, setSelectedGameType] = useState('');
    const [currentGameCount, setCurrentGameCount] = useState(0);
    const [page, setPage] = useState(1);
    const data = useSelector((state)=> state.session)
    const {remoteId} = useSelector((state)=>state.session)

    //  async function checkForAppUpdates(onUserClick) {
    //      try {
    //          const update = await check();

    //          if (update === null) {
    //              await message('Failed to check for updates.\nPlease try again later.', {
    //                  title: 'Error',
    //                  kind: 'error',
    //                  okLabel: 'OK',
    //              });
    //              return;
    //          }

    //          if (update?.available) {
    //              const yes = await ask(`Update to ${update.version} is available!\n\nRelease notes: ${update.body}`, {
    //                  title: 'Update Available',
    //                  kind: 'info',
    //                  okLabel: 'Update',
    //                  cancelLabel: 'Cancel',
    //              });


    //              if (yes) {
    //                  try {
    //                      await update.download(); // First, download the update
    //                      await update.install();
    //                      // await invoke('graceful_restart');
    //                  } catch (err) {
    //                      console.error('Update installation failed:', err);
    //                      await message('Failed to install the update.\nPlease try again later.', {
    //                          title: 'Update Failed',
    //                          kind: 'error',
    //                          okLabel: 'OK',
    //                      });
    //                  }
    //              }
    //          } else if (onUserClick) {
    //              await message('You are on the latest version. Stay awesome!', {
    //                  title: 'No Update Available',
    //                  kind: 'info',
    //                  okLabel: 'OK',
    //              });
    //          }
    //      } catch (err) {
    //          console.error('Update check failed:', err);
    //          await message(`Update check failed:\n${err?.message || err}`, {
    //              title: 'Error',
    //              kind: 'error',
    //              okLabel: 'OK',
    //          });
    //      }
    //  }
    
    const fetchGames = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/games/admin/getAllCombineAPI?action=available_games&token=${process.env.NEXT_PUBLIC_TOKEN}&casino=${process.env.NEXT_PUBLIC_CASINO}&page=${page}&provider=&gameType=${selectedGameType}&remoteId=${remoteId}`;

        try {
            setLoading(true);
            const response = await axios.get(url);
            const providers = response?.data?.providers || [];
            const gameTypes = response?.data.gamesTypes || [];
            const newGames = response?.data?.availableGames?.games || [];
            if (!selectedGameType) {
                setGameTypeData(gameTypes);
            }
            if (!selectedGameType) {
                setAllProviders(providers);
            }
            setAllGameData((prevGames) => (page === 1 ? newGames : [...prevGames, ...newGames]));
            setCurrentGameCount(response?.data?.availableGames?.currentGamesCount);
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

    // const handleDownload = () => {
    //     window.location.href = '/casinostar.msi'; 
    // };

    return (
        <>
            <main className={clsx(style.home_page)}>
                <Banner />
                {/* <button onClick={checkForAppUpdates} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    Check for Update 
                </button>
                <p>Current version is 0.1.0</p> */}
                <Providers loading={loading} data={allProviders} error={allGameError} setSelectedProvider={setSelectedProvider} />
                <Games
                    gameTypeData={gameTypeData}
                    data={allGameData}
                    error={allGameError}
                    setSelectedGameType={setSelectedGameType}
                    currentGameCount={currentGameCount}
                    page={page}
                    setPage={setPage}
                />
            </main>
        </>
    );
}
