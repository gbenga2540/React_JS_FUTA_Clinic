import React, { FunctionComponent, useState } from 'react';
import './Sign_Up_Page.scss';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import { useNavigate } from 'react-router-dom';

const SignUpPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');

    const send_user_info = () => {
        navigate('/');
    };

    return (
        <main className="su_main">
            <div className="su_m_cont">
                <h1>Register</h1>
                <div className="su_m_c_inputs">
                    <span>
                        <BasicTextEntry
                            title="Email"
                            inputValue={email}
                            setInputValue={setEmail}
                            placeHolder="johndoe@gmail.com"
                            inputType={'email'}
                        />
                        <BasicTextEntry
                            title="Full Name"
                            inputValue={fullName}
                            setInputValue={setFullName}
                            placeHolder="John Doe"
                            inputType={'text'}
                        />
                    </span>
                    <span>
                        <SecureTextEntry
                            title="Password"
                            inputValue={password}
                            setInputValue={setPassword}
                            placeHolder="******"
                        />
                        <SecureTextEntry
                            title="Confirm Password"
                            inputValue={cPassword}
                            setInputValue={setCPassword}
                            placeHolder="******"
                        />
                    </span>
                </div>
                <BasicButton
                    marginTop={30}
                    onClick={send_user_info}
                    title="Sign Up"
                />
                <p className="su_login">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </main>
    );
};

export default SignUpPage;
