import clsx from 'clsx';
import style from './pagination.module.scss';
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };
    const generatePageNumbers = () => {
        const pages = new Set([1, totalPages]);
        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            [1, 2, 3, 4, totalPages].forEach((p) => pages.add(p));
        } else if (currentPage >= totalPages - 2) {
            [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages].forEach((p) => pages.add(p));
        } else {
            [1, currentPage - 1, currentPage, currentPage + 1, totalPages].forEach((p) => pages.add(p));
        }

        return Array.from(pages)
            .sort((a, b) => a - b)
            .reduce((acc, page, index, arr) => {
                if (index > 0 && page - arr[index - 1] > 1) acc.push('...');
                acc.push(page);
                return acc;
            }, []);
    };
    return (
        <>
            <div className={style.pagination}>
                <p className={style.pagination_info}>
                    Showing {startItem} to {endItem} of {totalItems} entries
                </p>
                {totalPages > 1 && (
                    <div className={style.pagination_inner}>
                      <div className={clsx(style.prev, style.item, currentPage === 1 && style.disabled)}>
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </div>
                        <div className={clsx(style.item, style.active)}>
                            <button>{currentPage}</button>
                        </div>
                        <div className={clsx(style.next, style.item, currentPage === totalPages && style.disabled)}>
                        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Pagination;
