import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';
import ProductBox from '../Components/ProductBox';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products: ', error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories');
            setCategories(['All', ...response.data]);
        } catch (error) {
            console.error('Error fetching categories: ', error);
        }
    };

    const filterProducts = () => {
        let filteredData = products.filter(product =>
            (selectedCategory === 'All' || product.category === selectedCategory) &&
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredData);
    };

    useEffect(() => {
        filterProducts();
    }, [searchTerm, selectedCategory, products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='product'>
            <div className='container'>
                <div className='header'>
                    <div className='row'>
                        <div className='col-6 search'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className='col-6 filter'>
                            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='row'>

                    {

                        currentItems.length == 0 ?
                            <div>No Product</div>

                            :
                            currentItems && currentItems.map((item) => (
                                <ProductBox
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                            />
                            ))}
                </div>

                <Footer
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                paginate={paginate}
            />
            </div>
        </div>
    );
};

export default Product;
