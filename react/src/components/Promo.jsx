import React from 'react';

const Promo = (props) => {
    const { id, feature, benefit, target_audience } = props.data;

    return (
        <div className="card bg-light">
            <div className="card-text">{feature}</div>
            <div className="card-text"><a href="#">Click to buy!</a></div>
        </div>
    );
};

export default Promo;
