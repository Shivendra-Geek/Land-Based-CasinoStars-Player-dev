'use client';
import { Container } from '@mantine/core';
import style from './games.module.scss';
import clsx from 'clsx';
import GamesCategories from './games-categories';
import AllGames from './all-games';

const Games = ({ data, error, setSelectedGameType, page, setPage, currentGameCount, gameTypeData, loading }) => {
    return (
        <section className={clsx(style.games)}>
            <Container>
                <GamesCategories loading={loading} setSelectedGameType={setSelectedGameType} gameTypeData={gameTypeData} />
                <AllGames loading={loading} data={data} error={error} page={page} setPage={setPage} currentGameCount={currentGameCount} />
            </Container>
        </section>
    );
};

export default Games;
