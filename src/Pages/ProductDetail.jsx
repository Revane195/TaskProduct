import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductBox from '../Components/ProductBox';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState([]);
    const stars = [];

    console.log(id);

    const loadData = () => {
        setLoading(true);
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading product data: ', error);
                setLoading(false);
            });
    };

    const loadAllProducts = () => {
        setLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                const similarProducts = res.data.filter(prod => prod.category === product?.category);
                const filteredSimilarProducts = similarProducts.filter(prod => prod.id !== parseInt(id));
                const selectedSimilarProducts = filteredSimilarProducts.slice(0, 3);
                setSimilarProducts(selectedSimilarProducts);
                setLoading(false);

            })

            .catch(error => {
                console.error('Error loading similar products: ', error);
                setLoading(false);

            });
    };

    useEffect(() => {
        loadData();
    }, [id]);

    useEffect(() => {
        if (product) {
            loadAllProducts();
        }
    }, [product]);

    const setStar = (rating) => {
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<span key={i} className='star'>&#9733;</span>);
            }
            else {
                stars.push(<span key={i} className='star'>&#9734;</span>);
            }
        }
    };

    return (
        <div className='product-detail'>
            <div className='container'>
                {loading ? (
                    <div className='loading'>Loading...</div>
                ) : (
                    <div>
                        <div className='item row'>
                            <div className='col-md-4 col-12 img'>
                                <img src={`${product?.image}`} alt="" />
                            </div>
                            <div className='col-12 col-md-8'>
                                <div className='item-text'>
                                    <p className='item-text-title'>
                                        {product?.title}
                                    </p>
                                    <div className='item-text-rating'>
                                        {setStar(product?.rating?.rate)}
                                        <div>
                                            <p>{stars}</p>
                                            <p className='rate'>{product?.rating?.rate}</p>
                                        </div>
                                        <div className='count'>
                                            {product?.rating?.count} Reviews
                                        </div>
                                    </div>
                                    <div className='item-text-desc'>
                                        {product?.description}
                                    </div>
                                    <div className='item-text-price'>
                                        Price: {product?.price} $
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="similar-products">
                            <h2>Similar Category's Products
                            </h2>
                            <div className="row">
                                {similarProducts.map(item => (
                                    <ProductBox
                                        key={item.id}
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    );
};

export default ProductDetail;
