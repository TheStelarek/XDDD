import React from 'react';
import cx from 'classnames';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface IPagination {
	currentPage: number;
	handleFirstPage: () => void;
	handlePageClick: (selected: any) => void;
	handleLastPage: () => void;
	pageCount: number;
}

const Pagination: React.FC<IPagination> = ({
	handleFirstPage,
	currentPage,
	pageCount,
	handlePageClick,
	handleLastPage,
}) => (
	<div className={styles.paginationContainer}>
		<a
			role="first"
			className={cx(styles.firstPage, currentPage === 0 && styles.firstPageDisable)}
			onClick={handleFirstPage}
		>
			First
		</a>

		<ReactPaginate
			pageCount={pageCount}
			onPageChange={handlePageClick}
			className={styles.pagination}
			activeClassName={styles.pagination__linkActive}
			previousClassName={styles.previousClassName}
			nextClassName={styles.nextClassName}
			pageRangeDisplayed={2}
			marginPagesDisplayed={3}
			forcePage={currentPage}
		/>

		<a
			role="last"
			onClick={handleLastPage}
			className={cx(styles.lastPage, currentPage === pageCount - 1 && styles.lastPageDisable)}
		>
			Last
		</a>
	</div>
);

export default Pagination;
