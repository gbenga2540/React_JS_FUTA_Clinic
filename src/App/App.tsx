import React, { FunctionComponent } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentAccountPage from '../Pages/Student_Account_Page/Student_Account_Page';
import SignUpPage from '../Pages/Sign_Up_Page/Sign_Up_Page';

const App: FunctionComponent = () => {
    return (
        <div className="app_main">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUpPage />} />
                    <Route path="/account" element={<StudentAccountPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
