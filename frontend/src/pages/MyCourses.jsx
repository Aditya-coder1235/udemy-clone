import React from 'react'
import { clearCart,removeFromCart } from '../features/CartSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router'

const MyCourses = () => {
    const navigate=useNavigate()
  const dispatch=useDispatch()
  const items=useSelector((state)=>state.cart.items);



  const imageUrl = `http://localhost:8080`;
  let totalInrollCourses=items.length;
  let totalSum=items.reduce((initial,item)=>initial+item.price,0)

  return (
      <div className="min-h-screen bg-gray-100 pt-32 px-6">
          <div className="max-w-5xl mx-auto mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                  Your Courses ({totalInrollCourses})
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                  Total Price:{" "}
                  <span className="font-semibold text-purple-600">
                      ₹{totalSum}
                  </span>
              </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
              {items.length === 0 ? (
                  <div className="text-center text-gray-500 text-xl">
                      Your cart is empty
                  </div>
              ) : (
                  items.map((item) => (
                      <div
                          key={item._id}
                          className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row gap-6 p-6"
                      >
                          <img
                              src={`${imageUrl}${item.image}`}
                              alt={item.title}
                              className="w-full md:w-56 h-40 object-cover rounded-xl"
                          />

                          <div className="flex-1 flex flex-col justify-between">
                              <div>
                                  <h3 className="text-xl font-semibold text-gray-800">
                                      {item.title}
                                  </h3>
                                  <p className="text-gray-600 mt-2 line-clamp-2">
                                      {item.description}
                                  </p>
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                  <span className="text-lg font-bold text-purple-600">
                                      ₹{item.price}
                                  </span>
                                  <div className='flex gap-5'>
                                      <button
                                          onClick={() =>
                                              navigate(`/video/${item._id}`)
                                          }
                                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                                      >
                                          View Full Course
                                      </button>

                                      <button
                                          onClick={() =>
                                              dispatch(removeFromCart(item._id))
                                          }
                                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                      >
                                          Remove
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
              )}
          </div>

          {items.length > 0 && (
              <div className="max-w-5xl mx-auto mt-10 flex justify-end">
                  <button
                      onClick={() => dispatch(clearCart())}
                      className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition"
                  >
                      Delete All Courses
                  </button>
              </div>
          )}
      </div>
  );
}

export default MyCourses
