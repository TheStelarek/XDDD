import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './components/header/Header';
import RModal from './components/modal/Modal';
import ProductsList from './components/productsList/ProductsList';
import Pagination from './components/pagination/Pagination';
import Spinner from '../../components/spinner/Spinner';
import Empty from './components/empty/Empty';
import styles from './Products.module.scss';
import { Product } from '../../types/Product';
import { Meta } from '../../types/Meta';

export const Products = () => {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPromoItem, setIsPromoItem] = useState(false);
	const [isActiveItem, setIsActiveItem] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [product, setProduct] = useState<Product | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [meta, setMeta] = useState<Meta | null>(null);
	const history = useHistory();

	const getData = () => {
		let url = `https://join-tsh-api-staging.herokuapp.com/products?limit=8&page=${currentPage}`;
		if (isActiveItem) url += `&active=${isActiveItem}`;
		if (isPromoItem) url += `&promo=${isPromoItem}`;
		if (searchInput.length != 0) url += `&search=${searchInput}`;
		fetch(url)
			.then((result) => result.json())
			.then((data) => {
				setProducts(data.items);
				setIsLoading(false);
				setMeta(data.meta);
			});
	};

	const searchItems = (e: string) => {
		setSearchInput(e);
	};

	const promoItems = () => {
		setIsPromoItem((state) => !state);
	};

	const activeItems = () => {
		setIsActiveItem((state) => !state);
	};

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

	const handlePageClick = ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	const handleFirstPage = () => {
		setCurrentPage(1);
	};

	const handleLastPage = async () => {
		if (meta !== null) setCurrentPage(meta.totalPages);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getData();
	}, [isPromoItem, isActiveItem, searchInput, currentPage]);

	return (
		<div className={styles.container}>
			<Header
				onChangePromo={promoItems}
				onChangeActive={activeItems}
				onChangeSearch={(e) => searchItems(e.target.value)}
				routeChange={routeChange}
				isActiveItem={isActiveItem}
				isPromoItem={isPromoItem}
			/>
			<main className={styles.productsContainer}>
				{product && (
					<RModal
						image={product.image}
						handleCloseModal={handleCloseModal}
						isOpen={isOpen}
						name={product.name}
						description={product.description}
						alt={product.name}
					/>
				)}
				{products && <ProductsList products={products} onClick={(product) => handleOpenModal(product)} />}

				{meta && meta.totalPages >= 2 && (
					<Pagination
						currentPage={currentPage - 1}
						pageCount={meta.totalPages}
						handleLastPage={handleLastPage}
						handleFirstPage={handleFirstPage}
						handlePageClick={handlePageClick}
					/>
				)}

				<div className={styles.emptyContainer}>
					{isLoading && (
						<div className={styles.spinner}>
							<Spinner />
						</div>
					)}

					{products && products.length === 0 && <Empty />}
				</div>
			</main>
		</div>
	);
};
