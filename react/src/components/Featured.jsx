import React from 'react';
import Promo from './Promo'

const Featured = ({ promo_data }) => {
    return (
        <div>
            <h5>Featured</h5>
            <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>
                {promo_data.map((promo) => (
                    <Promo key={promo.id} data={promo} />
                ))}
            </div>
        </div>
    );
};

export default Featured;
