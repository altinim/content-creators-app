import React, { useEffect, useState } from "react";
import ProductTable from "../components/Product/ProductTable";
import Header from "../components/Header";
type Props = {};

const Products = (props: Props) => {
	return (
		<>
			<Header />
			<ProductTable />;
		</>
	);
};

export default Products;
