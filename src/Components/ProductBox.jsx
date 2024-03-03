
import React from 'react';
import { Link } from 'react-router-dom';

const ProductBox = ({ id, image, title, price }) => {
    return (
        <div className='col-12 col-md-4' key={id}>
            <div className='product-box'>
                <div className='img'>
                    <img src={image} alt="img" />
                </div>
                <div className='text'>
                    <p className='title'>{title}</p>
                    <p className='price'>{price} $</p>
                </div>
                <button className='more'>
                    <Link to={`/product/${id}`}>View more</Link>
                </button>
            </div>
        </div>
    );
};

export default ProductBox;
