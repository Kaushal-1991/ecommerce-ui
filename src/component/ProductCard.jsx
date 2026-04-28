import React, { useState } from 'react'
import { FaCartShopping } from 'react-icons/fa6';
import ProductCardViewModel from './ProductViewModal';
import ProductViewModal from './ProductViewModal';

const ProductCard = ({productId,productName,image,description,quantity,price,discount,specialPrice}) => {
  const [openProductViewModel,setOpenProductViewModel] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct,setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;

  const handleProductView = (product) => {
       setSelectedViewProduct(product);
       setOpenProductViewModel(true);
  }
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl overflow-hidden transition-shadow">
       <div onClick={() =>{
              handleProductView({
                id: productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice
              })
            }} className='w-full overflow-hidden aspect-3/2'>
          <img className='w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105'
          src={image}></img>
       </div>
       <div className='p-4'>
          <h2 onClick={() => {
          handleProductView({
            id: productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice
          })
          }} className='text-lg font-semibold mb-2 cursor-pointer'>{productName}</h2>
          <div className='min-h-20 max-h-20'>
            <p className='text-gray-600 text-sm'>{description}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
  
            {/* PRICE SECTION */}
            <div>
              {specialPrice ? (
                <div className='flex flex-col'>
                  <span className='text-gray-400 line-through'>
                    ${Number(price).toFixed(2)}
                  </span>
                  <span className='text-xl font-bold text-slate-700'>
                    ${Number(specialPrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className='text-xl font-bold text-slate-700'>
                  ${Number(price).toFixed(2)}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled = {!isAvailable && btnLoader}
              className={`flex items-center bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap ${
                isAvailable ? "opacity-100 hover:bg-blue-700" : "opacity-50"
              }`}
            >
              <FaCartShopping className="mr-2" />
              {isAvailable ? 'Add to cart' : 'Stock out'}
            </button>

          </div>
       </div>
       <ProductViewModal
        open = {openProductViewModel}
        setOpen = {setOpenProductViewModel}
        product = {selectedViewProduct}
        isAvailable  = {isAvailable}
        />
    </div>
  )
}

export default ProductCard