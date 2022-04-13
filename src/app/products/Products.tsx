import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import Logo from '../../components/logo/Logo';
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
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

export const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isPromoItem, setIsPromoItem] = useState(false);
	const [isActiveItem, setIsActiveItem] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);

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
		fetch(`https://join-tsh-api-staging.herokuapp.com/products?search=${e}`)
			.then((result) => result.json())
			.then((data) => setProducts(data.items));
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

			fetch(url)
				.then((result) => result.json())
				.then((data) => setProducts(data.items));
		};
		getData();
	}, [isPromoItem, isActiveItem]);

	const handleCloseModal = () => {
		setIsOpen(false);

		setProduct(null);
	};

	const handleOpenModal = (product: Product) => {
		setIsOpen(true);

		setProduct(product);
	};

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
					<Avatar />
				</div>
			</div>
			<main className={styles.productsContainer}>
				{product && (
					<Modal handleClose={handleCloseModal} isOpen={isOpen}>
						<span>{product.name}</span>
					</Modal>
				)}
				{products && (
					<ul className={styles.productsList}>
						{products.map((product) => (
							<li key={product.id} className={styles.product}>
								<div className={styles.productImage}>
									<img className={styles.image} src={product.image} />
									{!product.active && <div className={styles.productOverlay} />}
								</div>
								<div className={styles.productInfo}>
									{product.promo === true && <span className={styles.productPromo}>Promo</span>}
									<p className={styles.productName}>{product.name}</p>
									<p className={styles.productDescription}>{product.description}</p>
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
				{products && products.length == 0 && (
					<div className={styles.emptyContainer}>
						{isLoading === false ? (
							<Spinner />
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
