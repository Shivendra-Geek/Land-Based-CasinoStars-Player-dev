import FramesData from '@/components/common/frames-data';
import SendToSupport from '@/components/common/send-to-support';
import SortBtn from '@/components/common/table/sort-btn';
import VideosData from '@/components/common/videos-data';
import { dateFormat } from '@/lib/utils/date';

import { framesVideoData } from '@/lib/utils/frames-video';
import { Badge, Table } from '@mantine/core';

export const TableRow = ({ images, videos, item }) => {
    const isAdd = item?.actionType?.includes('Add');
    return (
        <Table.Tr>
            <Table.Td>
                <span>{item?.transactionID}</span>
            </Table.Td>
            <Table.Td>
                <span>{dateFormat(item?.createdAt)}</span>
            </Table.Td>
            <Table.Td>
                <span>{isAdd ? item?.sender?.username : item?.receiver?.username}</span>
            </Table.Td>
            <Table.Td>
                <span>{!isAdd ? item?.sender?.username : item?.receiver?.username}</span>
            </Table.Td>
            <Table.Td>
                <Badge className={`theme_badge ${isAdd ? 'badge_success' : 'badge_danger'}`}>{isAdd ? 'Deposit' : 'Withdraw'}</Badge>
            </Table.Td>
            <Table.Td>{isAdd ? <span className="text_success">{item?.amount}</span> : <span className="text_danger">{item?.amount}</span>}</Table.Td>
            <Table.Td>{<FramesData images={images || []} />}</Table.Td>
            <Table.Td>{<VideosData videos={videos || []} uniqueId={item?.transactionID} />}</Table.Td>
            {/* <Table.Td>
                <SendToSupport requestType={'transaction'} transactionId={item?.transactionID} creatorId={item?.player?.remoteId} />
            </Table.Td> */}
        </Table.Tr>
    );
};

const TransactionProblemInfo = ({ data, setSort }) => {
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
            <Table.ScrollContainer minWidth={1200} className="theme_table" scrollbars="x" offsetScrollbars={false}>
                <Table striped withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ minWidth: '160px', width: '11%' }}>
                                <SortBtn onClick={() => handleSorting('transactionID')}>Ref ID</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '220px', width: '12%' }}>
                                <SortBtn onClick={() => handleSorting('createdAt')}>Date & Time</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '220px', width: '12%' }}>
                                <span>Payeer</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '180px', width: '10%' }}>
                                <span>User</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px', width: '10%' }}>
                                <span>Action Type</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '160px', width: '10%' }}>
                                <SortBtn onClick={() => handleSorting('amount')}>Amount</SortBtn>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '120px', width: '8%' }}>
                                <span>Frames</span>
                            </Table.Th>
                            <Table.Th style={{ minWidth: '120px', width: '8%' }}>
                                <span>Videos</span>
                            </Table.Th>
                            {/* <Table.Th style={{ minWidth: '240px' }}>
                                <span>Support</span>
                            </Table.Th> */}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map((row) => (
                            <TableRow key={row.transactionID} item={row} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default TransactionProblemInfo;
