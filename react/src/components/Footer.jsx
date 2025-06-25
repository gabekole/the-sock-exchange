import React from 'react';

const Footer = () => {
    // Access the environment variable
    const environment = import.meta.env.VITE_ENVIRONMENT;

    // Determine the background class based on the environment
    const backgroundClass = environment === 'development' ? 'bg-yellow' : 'bg-green';

    return (
        <footer className={`${backgroundClass} text-center font-weight-bold`}>
            {environment}
        </footer>
    );
};

export default Footer;
