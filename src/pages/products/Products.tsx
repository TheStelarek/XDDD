import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './components/header/Header';
import styles from './Products.module.scss';
import RModal from './components/modal/Modal';
import RSpinner from './components/spinner/Spinner';
import ProductsList from './components/productsList/ProductsList';
import Pagination from './components/pagination/Pagination';

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

	function handleLastPage() {
		setCurrentPage(pageCount - 1);
	}

	return (
		<div className={styles.container}>
			<Header
				currentPage={currentPage}
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
					/>
				)}
				{products && (
					<ProductsList
						products={products}
						offset={offset}
						perPage={perPage}
						onClick={(product) => handleOpenModal(product)}
					/>
				)}

				{isLoading === true && pageCount >= 2 && (
					<Pagination
						currentPage={currentPage}
						pageCount={pageCount}
						handleLastPage={handleLastPage}
						handleFirstPage={handleFirstPage}
						handlePageClick={handlePageClick}
					/>
				)}

				{products && products.length == 0 && <RSpinner isLoading={isLoading} />}
			</main>
		</div>
	);
};
