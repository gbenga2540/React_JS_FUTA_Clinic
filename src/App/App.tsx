import React, { FunctionComponent } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../Components/Protected_Route/Protected_Route';
import SignUpPage from '../Pages/Sign_Up_Page/Sign_Up_Page';
import SignInPage from '../Pages/Sign_In_Page/Sign_In_Page';
import StudentAccountPage from '../Pages/Student_Account_Page/Student_Account_Page';
import HomePage from '../Pages/Home_Page/Home_Page';
import AllStudentsPage from '../Pages/All_Students_Page/All_Students_Page';
import StudentInfoPage from '../Pages/Student_Info_Page/Student_Info_Page';

const App: FunctionComponent = () => {
    return (
        <div className="app_main">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isAuthenticated={true}>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/students"
                        element={
                            <ProtectedRoute isAuthenticated={true}>
                                <AllStudentsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/students/:id"
                        element={
                            <ProtectedRoute isAuthenticated={true}>
                                <StudentInfoPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute isAuthenticated={true}>
                                <StudentAccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/register" element={<SignUpPage />} />
                    <Route path="/login" element={<SignInPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
