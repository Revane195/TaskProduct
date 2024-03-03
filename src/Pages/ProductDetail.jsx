import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
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

    useEffect(() => {
        loadData();
    }, [id]);

    const setStar = (rating) => {
        for (let i = 0; i < 5; i++) {
            if (i < Math.ceil(rating)) {
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
                    <div className='item row'>
                        <div className='col-4 img'>
                            <img src={`${product?.image}`} alt="" />
                        </div>
                        <div className='col-8'>
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
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
