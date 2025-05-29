'use client';
import FramesData from '@/components/common/frames-data';
import SendToSupport from '@/components/common/send-to-support';
import SortBtn from '@/components/common/table/sort-btn';
import VideosData from '@/components/common/videos-data';
import { dateFormat } from '@/lib/utils/date';
import { framesVideoData } from '@/lib/utils/frames-video';
import { Badge, Space, Table } from '@mantine/core';

export const TableRow = ({ images, videos, uniqueId, item }) => {
    const isBet = item?.actionType?.toLowerCase() === 'bet';
    const isWin = item?.actionType?.toLowerCase() === 'win';
    return (
        <Table.Tr>
            <Table.Td>
                <span>{item?.roundId || '-'}</span>
            </Table.Td>
            <Table.Td>
                <span>{dateFormat(item?.createdAt) || '-'}</span>
            </Table.Td>
            <Table.Td>
                <span>{item?.username || '-'}</span>
            </Table.Td>
            <Table.Td>
                <span>{item?.providerName || '-'}</span>
            </Table.Td>
            <Table.Td>
                <span>{item?.gameType || '-'}</span>
            </Table.Td>
            <Table.Td>{item?.actionType ? <Badge className={`theme_badge ${isWin || isBet ? 'badge_success' : 'badge_danger'}`}>{isWin || isBet ? 'Accepted' : 'Rejected'}</Badge> : '-'}</Table.Td>
            <Table.Td>
                <span>{item?.beforeBalance?.toFixed(2) || '-'}</span>
            </Table.Td>

            <Table.Td>
                <span>{isBet ? item?.amount?.toFixed(2) : '-' || '-'}</span>
            </Table.Td>
            <Table.Td>
                {' '}
                <span>{isWin ? item?.amount?.toFixed(2) : '-'}</span> <span></span>
            </Table.Td>
            <Table.Td>
                <Badge className="theme_badge badge_success">In Balance: 1,000.00</Badge>
                <Space h={5} />
                <Badge className="theme_badge badge_orange">Out Balance: 1,000.00</Badge>
            </Table.Td>
            <Table.Td>
            <span>{item?.afterBalance?.toFixed(2) || '-'}</span>
            </Table.Td>
            <Table.Td>{/* <FramesData images={images} shareEnable={true} /> */}-</Table.Td>
            <Table.Td>{/* <VideosData videos={videos} shareEnable={true} uniqueId={uniqueId} /> */}-</Table.Td>
            {/* <Table.Td>
            <SendToSupport requestType={"game"} roundId={item?.roundId} creatorId={item?.fatherId} />
            </Table.Td> */}
        </Table.Tr>
    );
};

const GameProblemInfo = ({ data }) => {
    const handleSorting = (field) => {
        setSort((prev) => {
            if (prev.field === field) {
                return {
                    field,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return {
                field,
                direction: 'asc',
            };
        });
    };
    return (
        <>
            <Table.ScrollContainer className="theme_table" minWidth={1200} scrollbars="x" offsetScrollbars={false}>
                <Table striped withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ minWidth: '180px' }}>
                                <SortBtn onClick={() => handleSorting('roundId')}>Round ID</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '240px' }}>
                                <SortBtn onClick={() => handleSorting('createdAt')}>Date & Time</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px' }}>
                                <SortBtn onClick={() => handleSorting('username')}>User</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px' }}>
                                <SortBtn onClick={() => handleSorting('providerName')}>Provider</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px' }}>
                                <SortBtn onClick={() => handleSorting('gameType')}>Game Type</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '180px' }}>
                                <span>Bet Status</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '200px' }}>
                                <SortBtn onClick={() => handleSorting('beforeBalance')}>Balance Before</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px' }}>
                                <SortBtn onClick={() => handleSorting('amount')}>Bet</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '140px' }}>
                                <SortBtn onClick={() => handleSorting('amount')}>Result</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '260px' }}>
                                <SortBtn>Over Win Limit</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '200px' }}>
                                <SortBtn onClick={() => handleSorting('afterBalance')}>Balance After</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '120px' }}>
                                <span>Frames</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '120px' }}>
                                <span>Videos</span>
                            </Table.Th>
                            {/* <Table.Th style={{ minWidth: '280px' }}>
                                <span>Support</span>
                            </Table.Th> */}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data?.map((row, index) => (
                            <TableRow key={index} item={row} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default GameProblemInfo;
