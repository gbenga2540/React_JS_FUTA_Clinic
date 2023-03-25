import React, { FunctionComponent, useState } from 'react';
import './Sign_In_Page.scss';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import { useNavigate } from 'react-router-dom';

const SignInPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');

    const send_user_info = () => {
        navigate('/');
    };

    return (
        <main className="si_main">
            <div className="si_m_cont">
                <h1>Login</h1>
                <div className="si_m_c_inputs">
                    <span>
                        <BasicTextEntry
                            title="Email"
                            inputValue={email}
                            setInputValue={setEmail}
                            placeHolder="johndoe@gmail.com"
                            inputType={'email'}
                        />
                        <SecureTextEntry
                            title="Password"
                            inputValue={password}
                            setInputValue={setPassword}
                            placeHolder="******"
                        />
                    </span>
                </div>
                <BasicButton
                    marginTop={30}
                    onClick={send_user_info}
                    title="Sign In"
                />
                <p className="su_login">
                    Don't have an account?{' '}
                    <span onClick={() => navigate('/register')}>SignUp</span>
                </p>
            </div>
        </main>
    );
};

export default SignInPage;
