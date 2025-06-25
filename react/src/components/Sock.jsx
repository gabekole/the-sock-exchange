import React from 'react';

const Sock = (props) => {
    const { sockDetails, additionalFeatures, addedTimestamp } = props.data;

    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">Sock Details</h5>
                <div className="card-text">Size: {sockDetails.size}</div>
                <div className="card-text">Color: {sockDetails.color}</div>
                <div className="card-text">Pattern: {sockDetails.pattern}</div>
                <div className="card-text">Material: {sockDetails.material}</div>
                <div className="card-text">Condition: {sockDetails.condition}</div>
                <div className="card-text">For Foot: {sockDetails.forFoot}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title">Additional Features</h5>
                <div className="card-text">Water Resistant: {additionalFeatures.waterResistant ? 'Yes' : 'No'}</div>
                <div className="card-text">Padded: {additionalFeatures.padded ? 'Yes' : 'No'}</div>
                <div className="card-text">Anti Bacterial: {additionalFeatures.antiBacterial ? 'Yes' : 'No'}</div>
            </div>
            <div className="card-footer">
                <small className="text-muted">Added: {new Date(addedTimestamp).toLocaleDateString()}</small>
            </div>
        </div>
    );
};

export default Sock;
