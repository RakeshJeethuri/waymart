"use client"; // Mark this file as a client component

import React, { useEffect, useState } from 'react';
import Nav from '../Navbar/page'; // Adjusted the path to point to the correct location of Navbar
import './style.css'; // Adjusted the path to point to the correct location of style.css

const Home = () => {
    interface Product {
        id: number;
        title: string;
        description: string;
        price: number;
        image: string;
    }

    const [products, setProducts] = useState<Product[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                console.log(data); // Log the fetched data to the console
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // Added an empty dependency array to avoid infinite re-renders

    return (
        <>
            <Nav />
            <div className='home'>
                <h1>Welcome to the User Home Page</h1>
                <div className='products'>
                    {products.map((product) => (
                        <div key={product.id} className='product-card'>
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;