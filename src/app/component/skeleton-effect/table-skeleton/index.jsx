'use client';

import { Skeleton, Checkbox, Box, Group, Stack, ScrollArea } from '@mantine/core';
import styles from './table-sksleton.module.scss';

export default function TableSkeleton({ rows = 10, columns = 5 }) {
    return (
        <Box className={styles.container}>
            <ScrollArea scrollbars="x" type="always" style={{ minWidth: '800px' }}>
                {/* Header */}
                <Group className={styles.header} px="md">
                    <Box w="30px" />
                    {Array.from({ length: columns }).map((_, i) => (
                        <Box key={i} className={styles.headerCell} mb="sm">
                            <Skeleton height={12} radius="xl" width={100} />
                        </Box>
                    ))}
                </Group>

                {/* Rows */}
                <Stack>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <Group key={rowIdx} className={styles.row}>
                            <Checkbox size="sm" className={styles.checkbox} />
                            {Array.from({ length: columns }).map((_, colIdx) => (
                                <div key={colIdx} className={styles.cell}>
                                    <Skeleton height={24} circle />
                                    <Skeleton height={10} radius="xl" width="100%" className={styles.bar} />
                                </div>
                            ))}
                        </Group>
                    ))}
                </Stack>
            </ScrollArea>
        </Box>
    );
}
