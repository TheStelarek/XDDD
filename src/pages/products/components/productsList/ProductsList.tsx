import styles from './ProductsList.module.scss';
import { ReactComponent as FilledStar } from '../../../../assets/icons/Star.svg';
import { ReactComponent as Star } from '../../../../assets/icons/Star_border.svg';
import Button from '../../../../components/button/Button';
import { MouseEventHandler } from 'react';

interface Product {
	active: boolean;
	description: string;
	id: number;
	image: string;
	name: string;
	promo: boolean;
	rating: number;
}

interface ProductsProps {
	products: Product[];
	offset: number;
	perPage: number;
	onClick: (product: Product) => void;
}

const ProductsList: React.FC<ProductsProps> = ({ products, offset, perPage, onClick }) => {
	return (
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
							<Button variant={'primary'} isDisabled={!product.active} onClick={() => onClick(product)}>
								<span>{product.active ? 'Show details' : 'Unavailable'}</span>
							</Button>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default ProductsList;
