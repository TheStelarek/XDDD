import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './Products.module.scss';
import Logo from '../../components/logo/Logo';
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import { ReactComponent as FilledStar } from '../../assets/icons/Star.svg';
import { ReactComponent as Star } from '../../assets/icons/Star_border.svg';
import { ReactComponent as Search } from '../../assets/icons/Shape.svg';
import { ReactComponent as Empty } from '../../assets/icons/Group.svg';
import Modal from '../../components/modal/Modal';

interface Product {
	active: boolean;
	description: string;
	id: number;
	image: string;
	name: string;
	promo: boolean;
	rating: number;
}

const perPage = 8;

export const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isPromoItem, setIsPromoItem] = useState(false);
	const [isActiveItem, setIsActiveItem] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [product, setProduct] = useState<Product | null>(null);
	const [currentPage, setCurrentPage] = useState(0);

	const history = useHistory();

	useEffect(() => {
		const getData = () => {
			fetch(`https://join-tsh-api-staging.herokuapp.com/products`)
				.then((result) => result.json())
				.then((data) => {
					setProducts(data.items);
					setIsLoading(true);
				});
		};
		getData();
	}, []);

	const searchItems = (e: string) => {
		setSearchInput(e);
	};

	const promoItems = () => {
		setIsPromoItem((state) => !state);
	};

	const activeItems = () => {
		setIsActiveItem((state) => !state);
	};

	useEffect(() => {
		const getData = () => {
			let url = `https://join-tsh-api-staging.herokuapp.com/products?`;
			if (isActiveItem) url += `&active=${isActiveItem}`;
			if (isPromoItem) url += `&promo=${isPromoItem}`;
			if (searchInput.length != 0) url += `&search=${searchInput}`;
			setCurrentPage(0);

			fetch(url)
				.then((result) => result.json())
				.then((data) => setProducts(data.items));
		};
		getData();
	}, [isPromoItem, isActiveItem, searchInput]);

	const handleCloseModal = () => {
		setIsOpen(false);
		setProduct(null);
	};

	const handleOpenModal = (product: Product) => {
		setIsOpen(true);
		setProduct(product);
	};

	const routeChange = () => {
		let path = 'Login';
		history.push(path);
	};

	const pageCount = Math.ceil(products.length / perPage);

	const offset = currentPage * perPage;

	function handlePageClick({ selected: selectedPage }: any) {
		setCurrentPage(selectedPage);
	}

	function handleFirstPage() {
		setCurrentPage(0);
	}

	function hangleLastPage() {
		setCurrentPage(pageCount - 1);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div className={styles.searchContainer}>
					<Input
						id={'Search'}
						placeholder={'Search'}
						hasIcon={<Search />}
						onChange={(e) => searchItems(e.target.value)}
					/>
				</div>
				<div className={styles.checkboxContainer}>
					<Checkbox label={'Active'} value={isActiveItem} onChange={() => activeItems()} />
					<Checkbox label={'Promo'} value={isPromoItem} onChange={() => promoItems()} />
				</div>
				<div className={styles.avatarContainer}>
					<Button variant="ghost-primary" onClick={routeChange}>
						<span>Login</span>
					</Button>
				</div>
			</div>
			<main className={styles.productsContainer}>
				{product && (
					<Modal handleClose={handleCloseModal} isOpen={isOpen}>
						<img src={product.image} className={styles.modalImage} />
						<div className={styles.productInfo}>
							<h1 className={styles.productName}>{product.name}</h1>
							<span className={styles.productDescription}>{product.description}</span>
						</div>
					</Modal>
				)}
				{products && (
					<ul className={styles.productsList}>
						{products.slice(offset, offset + perPage).map((product) => (
							<li key={product.id} className={styles.product}>
								<div className={styles.productImage}>
									<img className={styles.image} src={product.image} />
									{!product.active && <div className={styles.productOverlay} />}
								</div>
								<div className={styles.productInfo}>
									{product.promo === true && <span className={styles.productPromo}>Promo</span>}
									<div className={styles.productWrapper}>
										<p className={styles.productName}>{product.name}</p>
										<p className={styles.productDescription}>{product.description}</p>
									</div>
									<span className={styles.productRatingContainer}>
										{[...Array(5)].map((_, index) => (
											<label className={styles.stars} key={index}>
												{product.rating > index ? <FilledStar /> : <Star />}
											</label>
										))}
									</span>
									<div className={styles.productButton}>
										<Button
											variant={'primary'}
											isDisabled={!product.active}
											onClick={() => handleOpenModal(product)}
										>
											<span>{product.active ? 'Show details' : 'Unavailable'}</span>
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}

				{isLoading === true && pageCount >= 2 && (
					<div className={styles.paginationContainer}>
						<a
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

						<span
							onClick={hangleLastPage}
							className={cx(styles.lastPage, currentPage === pageCount - 1 && styles.lastPageDisable)}
						>
							Last
						</span>
					</div>
				)}

				{products && products.length == 0 && (
					<div className={styles.emptyContainer}>
						{isLoading === false ? (
							<div className={styles.spinner}>
								<Spinner />
							</div>
						) : (
							<div className={styles.emptyWrapper}>
								<Empty />
								<span className={styles.upperText}>Ooops… It’s empty here</span>
								<span className={styles.lowerText}>There are no products on the list</span>
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
};
