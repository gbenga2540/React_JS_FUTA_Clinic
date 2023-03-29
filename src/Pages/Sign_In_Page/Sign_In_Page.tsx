import React, { FunctionComponent, useState } from 'react';
import './Sign_In_Page.scss';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { email_checker } from '../../Utils/Email_Checker/Email_Checker';
import Axios from 'axios';

const SignInPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const sign_in = () => {
        setDisableButton(true);
        const toast_id = toast.loading('Please wait...');
        if (password && email) {
            if (email_checker(email)) {
                try {
                    Axios.post(
                        `${process.env.REACT_APP_REST_API}/users/auth/signin`,
                        {
                            email: email,
                            password: password,
                        },
                    )
                        .catch(err => {
                            setDisableButton(false);
                            if (err) {
                                toast.update(toast_id, {
                                    render: err,
                                    type: 'error',
                                    isLoading: false,
                                    autoClose: 2000,
                                });
                            }
                        })
                        .then(res => {
                            if (res?.data?.status === 'success') {
                                localStorage.setItem(
                                    process.env.REACT_APP_USER_INFO as string,
                                    JSON.stringify(res?.data?.response),
                                );
                                setDisableButton(false);
                                toast.update(toast_id, {
                                    render: 'Successfully Signed In!',
                                    type: 'success',
                                    isLoading: false,
                                    autoClose: 1000,
                                });
                                setEmail('');
                                setPassword('');
                                navigate('/');
                            } else if (res?.data?.status === 'error') {
                                setDisableButton(false);
                                toast.update(toast_id, {
                                    render: res?.data?.code,
                                    type: 'error',
                                    isLoading: false,
                                    autoClose: 2000,
                                });
                            } else {
                                setDisableButton(false);
                                toast.update(toast_id, {
                                    render: 'Error signing in User!',
                                    type: 'error',
                                    isLoading: false,
                                    autoClose: 2000,
                                });
                            }
                        });
                } catch (error) {
                    setDisableButton(false);
                    toast.update(toast_id, {
                        render: 'Error signing in User!',
                        type: 'error',
                        isLoading: false,
                        autoClose: 2000,
                    });
                }
            } else {
                setDisableButton(false);
                toast.update(toast_id, {
                    render: 'Invalid Email!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } else {
            setDisableButton(false);
            toast.update(toast_id, {
                render: `Some fields are missing!`,
                type: 'warning',
                isLoading: false,
                autoClose: 2000,
            });
        }
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
                <BasicButton marginTop={30} onClick={sign_in} title="Sign In" />
                <p className="su_login">
                    Don't have an account?{' '}
                    <span onClick={() => navigate('/register')}>SignUp</span>
                </p>
            </div>
        </main>
    );
};

export default SignInPage;
