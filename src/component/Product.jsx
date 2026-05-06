import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import ProductCardViewModel from './ProductViewModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions';

const Product = () => {

    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    const { products } = useSelector(
        (state) => state.products
    );

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchProducts());

    }, [dispatch]);

    return (

        <div className="lg:px-4 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">

            {
                isLoading ? (

                    <div className="flex justify-center items-center min-h-[500px]">

                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin">
                        </div>

                    </div>

                ) : errorMessage ? (

                    <div className="flex justify-center items-center min-h-[500px] px-4">

                        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-red-100">

                            <div className="flex justify-center">

                                <div className="bg-red-100 p-5 rounded-full">

                                    <FaExclamationTriangle className="text-red-500 text-5xl" />

                                </div>

                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mt-6">
                                Oops!
                            </h1>

                            <p className="text-gray-500 mt-3 text-lg">
                                Something went wrong while fetching products.
                            </p>

                            <div className="mt-5 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium break-words">
                                {errorMessage}
                            </div>

                            <button
                                onClick={() => dispatch(fetchProducts())}
                                className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Retry Again
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="min-h-175">

                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">

                            {
                                products &&
                                products.map((item, i) => (
                                    <ProductCard key={i} {...item} />
                                ))
                            }

                        </div>

                    </div>

                )
            }

        </div>
    );
};

export default Product;