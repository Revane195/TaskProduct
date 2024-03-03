import React from 'react';

const Footer = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className='footer'>
            {
                totalPages == 0 ?
                    <></>
                    :
                    <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1}>Back</button>
            }

            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            ))}
            {
                totalPages == 0 ?
                    <></>
                    :
                    <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>


            }
        </div>
    );
};

export default Footer;
