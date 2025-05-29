'use client';

import { DateFrom, DateTo } from '@/components/common/date-filter';
import Pagination from '@/components/common/pagination';
import ShowEntries from '@/components/common/show-entries';
import { Button, Grid } from '@mantine/core';
import clsx from 'clsx';
import GameProblemInfo from './game-problem-info';
import style from './game-problem.module.scss';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import StatusMsg from '@/components/common/status-msg';
import TableSkeleton from '@/app/component/skeleton-effect/table-skeleton';

const GameProblem = () => {
    const [error, setError] = useState({ message: '', variant: '' });
    const [gameHistoryData, setGameHistoryData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState({ field: '', direction: '' });
    const { username } = useSelector((state) => state.session);
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const [fromDate, setFromDate] = useState({
        date: sevenDaysAgo,
        time: moment(sevenDaysAgo).format('HH:mm'),
    });
    const [toDate, setToDate] = useState({
        date: now,
        time: moment(now).format('HH:mm'),
    });

    const getHistoryData = async () => {
        setLoading(true);
        setError({ message: '', variant: '' });
        const params = {
            casino: process.env.NEXT_PUBLIC_CASINO,
            limit,
            page,
            sortKey: sort?.field,
            sortOrder: sort?.direction,
            accountType: 'player',
            startDate: fromDate?.date,
            endDate: toDate?.date,
            username: `casinostars_${username}`,
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/game/general-game-history`, {
                params,
            });
            const res = response?.data;
            if (res?.status === 200) {
                if (res?.data?.length > 0) {
                    setGameHistoryData(res?.data);
                    setTotalItems(res?.pagination?.total);
                    setError({ message: '', variant: '' });
                } else {
                    setGameHistoryData([]);
                    setError({ message: 'There are no data available', variant: 'info' });
                }
            } else {
                setError({ message: res?.message, variant: 'danger' });
            }
        } catch (error) {
            setError({ message: error.message, variant: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistoryData();
    }, [limit, page, sort]);

    return (
        <main className={style.game_problem}>
            <Grid>
                <Grid.Col span={12}>
                    <div className={'page_header'}>
                        <h1 className="page_title">Game Problem</h1>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className={clsx('page_filter_sec')}>
                        <DateFrom setFromDate={setFromDate} fromDate={fromDate} />
                        <DateTo setToDate={setToDate} toDate={toDate} />
                        <Button className="theme_btn bth_white filter_btn" onClick={getHistoryData}>
                            Filter
                        </Button>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className={clsx('page_options')}>
                        <ShowEntries className="bg_transparent" setLimit={setLimit} limit={limit} setPage={setPage} />
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className={'page_info_table'}>
                        {loading ? (
                            <TableSkeleton rows={6} columns={6} />
                        ) : error?.message ? (
                            <StatusMsg title={error?.message} variant={error?.variant} />
                        ) : (
                            <GameProblemInfo data={gameHistoryData} setSort={setSort} />
                        )}
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className={'page_pagination'}>{!error?.message && <Pagination totalItems={totalItems} itemsPerPage={limit} currentPage={page} onPageChange={setPage} />}</div>
                </Grid.Col>
            </Grid>
        </main>
    );
};

export default GameProblem;
