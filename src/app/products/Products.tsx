import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/button/Button';
import { AppRoute } from 'routing/AppRoute.enum';

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [hasError, setErrors] = useState(false);

	async function fetchData() {
		const res = await fetch('https://join-tsh-api-staging.herokuapp.com/products');
		res.json()
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => setErrors(err));
	}

	useEffect(() => {
		fetchData();
	}, []);

	console.log(products);

	return (
		<>
			<h2>Products page</h2>
			<Link to={AppRoute.Login}> Login </Link>
			<br />
		</>
	);
};
