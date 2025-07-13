import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa';
import { addToCart } from '../services/cartService';
import { toast } from 'react-toastify';
import API from '../api/axios';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/api/products/${productId}`);
        console.log("Product data fetched:", response.data);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
      toast.success(`${quantity} ${product.name} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Login to add item to cart.');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (product.imageUrl?.length || 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (product.imageUrl?.length || 1)) % (product.imageUrl?.length || 1));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically call an API to update the wishlist
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
        <Link to="/collection" className="ml-4 text-black hover:text-black">
          Back to Collection
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  // Convert price from cents to dollars
  const price = (product.price / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link to="/" className="text-black hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/collection" className="text-black hover:text-black">
                Collection
              </Link>
            </li>
            <li aria-current="page">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/600"}
                  alt={product.name}
                  className="w-full h-full "
                />
                
                {/* Navigation Arrows */}
                {product.imageUrl?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                    >
                      <FaChevronLeft className="text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                    >
                      <FaChevronRight className="text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {Array.isArray(product.imageUrl) && product.imageUrl.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.imageUrl.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-indigo-500' : 'border-transparent'}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      i < 4 ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-semibold text-gray-900">${price}</p>
                {product.stock > 0 ? (
                  <p className="text-green-600">In Stock ({product.stock} available)</p>
                ) : (
                  <p className="text-red-600">Out of Stock</p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Brand</h3>
                  <p className="mt-1 text-sm text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Category</h3>
                  <p className="mt-1 text-sm text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Seller</h3>
                  <p className="mt-1 text-sm text-gray-600">{product.seller}</p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-4 py-2 text-center w-12">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <FaHeart size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`flex items-center justify-center px-6 py-3 rounded-md ${product.stock > 0 ? 'bg-black hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    disabled={product.stock <= 0}
                    className={`px-6 py-3 rounded-md ${product.stock > 0 ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;