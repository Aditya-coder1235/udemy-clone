import {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router';

const UpdateCourse = () => {
    const navigate=useNavigate()
    let {id} =useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState("");


    async function updateCourse(){

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        let res = await axios.put(`http://localhost:8080/api/course/update/${id}`,formData,{withCredentials:true});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await updateCourse()
        alert('course update')
        navigate('/')
    }


  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-20">
          <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
          >
              <h2 className="text-2xl font-bold text-center text-gray-800">
                  Update Course
              </h2>

              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                      Course Title
                  </label>
                  <input
                      type="text"
                      placeholder="Enter course title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                      Description
                  </label>
                  <textarea
                      placeholder="Enter course description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                      Image
                  </label>
                  <input
                      type="file"
                      placeholder="Upload image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      accept="image/*"
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                      Price (₹)
                  </label>
                  <input
                      type="number"
                      placeholder="Enter course price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
              </div>

              <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
              >
                  Update Course
              </button>
          </form>
      </div>
  );
}

export default UpdateCourse