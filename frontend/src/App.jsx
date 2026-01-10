import "./App.css";
import { Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreateCourse from "./pages/CreateCourse";
import ErrorPage from "./pages/ErrorPage";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import UpdateCourse from "./pages/UpdateCourse";

function App() {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mycourses" element={<MyCourses />} />
                <Route
                    path="/createCourses"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <CreateCourse />
                        </ProtectedRoute>
                    }
                />

                <Route path="/course/:id" element={<CourseDetails />}></Route>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/update/:id" element={<UpdateCourse />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;

// import './App.css'
// import Index from './pages/Index'
// import {Route,Routes} from 'react-router'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import MyCourses from './pages/MyCourses'
// import NavBar from './components/NavBar'
// import Footer from './components/Footer'

// function App() {

//   return (
//       <>
//           <NavBar/>
//           <Index />
//           <Footer/>
//           <Routes>
//               <Route path="/login" element={<Login />}></Route>
//               <Route path="/register" element={<Register />}></Route>
//               <Route path="/mycourses" element={<MyCourses />}></Route>
//           </Routes>
//       </>
//   );
// }

// export default App
