import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function ProductViewModal({ open, setOpen, product, isAvailable }) {

  if (!product) return null;

  const {
    productName,
    image,
    description,
    price,
    discount,
    specialPrice
  } = product;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
          <div className="w-full h-56 bg-gray-100">
            <img
              src={image}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 space-y-3">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              {productName}
            </DialogTitle>
            <p className="text-sm text-gray-500">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">
                ₹{specialPrice}
              </span>
              <span className="text-sm line-through text-gray-400">
                ₹{price}
              </span>
              <span className="text-xs text-red-500 font-medium">
                {discount}% OFF
              </span>
            </div>
            <div>
              {isAvailable ? (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              
              <button
                className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>

            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;