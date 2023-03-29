import React, { FunctionComponent, useState } from 'react';
import './Home_Page.scss';
import { gender_data } from '../../Data/Student_Account_Info';
import { StudentInfoProps } from '../../Interface/Student_Info';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigate } from 'react-router-dom';

const HomePage: FunctionComponent = () => {
    const navigate = useNavigate();

    const sign_out = () => {
        localStorage.removeItem(process.env.REACT_APP_USER_INFO as string);
        navigate('/login');
    };

    return (
        <main className="home_main">
            <div className="h_m_cont">
                <h1>Welcome to FUTA's Clinic</h1>
                <p>What would you like to do?</p>
                <div className="h_m_c_inputs">
                    <p>Add to Student Records?</p>
                    <BasicButton
                        marginTop={5}
                        marginBottom={15}
                        onClick={() => navigate('/account')}
                        title="New Record"
                    />
                    <p>View all Records?</p>
                    <BasicButton
                        marginTop={5}
                        marginBottom={15}
                        onClick={() => navigate('/students')}
                        title="View Records"
                    />
                    <p>Sign Out?</p>
                    <BasicButton
                        marginTop={5}
                        marginBottom={15}
                        onClick={() => sign_out()}
                        title="Sign Out"
                    />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
