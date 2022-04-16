import Button from '../../../../components/button/Button';
import { ReactComponent as FilledStar } from '../../../../assets/icons/Star.svg';
import { ReactComponent as Star } from '../../../../assets/icons/Star_border.svg';
import styles from './ProductsList.module.scss';
import { Product } from '../../../../types/Product';

interface ProductsProps {
	products: Product[];
	onClick: (product: Product) => void;
}

const ProductsList: React.FC<ProductsProps> = ({ products, onClick }) => {
	return (
		<ul className={styles.productsList}>
			{products.map((product) => (
				<li key={product.id} className={styles.product}>
					<div className={styles.productImage}>
						<img className={styles.image} src={product.image} alt={product.name} />
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
