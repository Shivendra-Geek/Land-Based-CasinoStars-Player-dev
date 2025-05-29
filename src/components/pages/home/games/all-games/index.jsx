'use client';
import GameBox from '@/components/common/game-box';
import style from './all-games.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import StatusMsg from '@/components/common/status-msg';
import { Skeleton } from '@mantine/core';

const AllGames = ({ data, error, currentGameCount, page, setPage, loading }) => {
    const getInfiniteData = () => {
        setPage(page + 1);
    };

    return (
        <InfiniteScroll
            dataLength={data?.length || 0}
            next={getInfiniteData}
            hasMore={currentGameCount !== 0}
            loader={
                currentGameCount === 0 ? (
                    <StatusMsg message="No Games Found" />
                ) : (
                    <div className={style.all_games} style={{ marginTop: '1.875rem' }}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton style={{ height: 'clamp(6.25rem, 3.75rem + 12.5vw, 18.75rem)' }} radius="lg" key={i} />
                        ))}
                    </div>
                )
            }
        >
            {error ? (
                <StatusMsg message={error || 'No Games Found'} />
            ) : data.length > 0 ? (
                <div className={style.all_games}>{data.length > 0 && data.map((game, i) => <GameBox key={`${i}-${game?.gameIcon}`} data={game} />)}</div>
            ) : (
                !loading && <StatusMsg message={'There are no games found'} />
            )}
        </InfiniteScroll>
    );
};
export default AllGames;
