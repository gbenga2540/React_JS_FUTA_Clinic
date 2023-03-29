import React, { FunctionComponent, useState } from 'react';
import './Student_Account_Page.scss';
import {
    blood_group,
    blood_type,
    gender_data,
} from '../../Data/Student_Account_Info';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentAccountPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [matricNo, setMatricNo] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>(gender_data[0]);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phc, setPHC] = useState<string>('');
    const [bloodType, setBloodType] = useState<string>(blood_type[0]);
    const [bloodGroup, setBloodGroup] = useState<string>(blood_group[0]);

    const send_user_info = () => {
        const toast_id = toast.loading('Please wait...');
        try {
            const user_info = localStorage.getItem(
                process.env.REACT_APP_USER_INFO as string,
            );
            if (
                user_info === undefined ||
                user_info === null ||
                user_info === 'undefined' ||
                user_info === 'null'
            ) {
                toast.update(toast_id, {
                    render: `User Token is missing! Please sign in!`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
                navigate('/login');
            } else {
                const token = JSON.parse(user_info || '{}')?.token;
                if (token) {
                    if (
                        firstName &&
                        lastName &&
                        email &&
                        matricNo &&
                        age &&
                        gender &&
                        phoneNo &&
                        address &&
                        bloodGroup &&
                        bloodType
                    ) {
                        try {
                            Axios.post(
                                `${process.env.REACT_APP_REST_API}/students/create`,
                                {
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    matric_no: matricNo,
                                    age: age,
                                    gender: gender,
                                    phone_no: phoneNo,
                                    address: address,
                                    phc: phc,
                                    blood_group: bloodGroup,
                                    blood_type: bloodType,
                                    headers: {
                                        'x-access-token': token,
                                    },
                                },
                            )
                                .catch(err => {
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
                                        toast.update(toast_id, {
                                            render: 'Successfully Registered!',
                                            type: 'success',
                                            isLoading: false,
                                            autoClose: 1000,
                                        });
                                        setFirstName('');
                                        setLastName('');
                                        setEmail('');
                                        setMatricNo('');
                                        setAge('');
                                        setGender('');
                                        setPhoneNo('');
                                        setAddress('');
                                        setPHC('');
                                        setBloodGroup('');
                                        setBloodType('');
                                    } else if (res?.data?.status === 'error') {
                                        toast.update(toast_id, {
                                            render: res?.data?.code,
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    } else {
                                        toast.update(toast_id, {
                                            render: "Error updating Student's Information!",
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    }
                                });
                        } catch (error) {
                            toast.update(toast_id, {
                                render: "Error updating Student's Information!",
                                type: 'error',
                                isLoading: false,
                                autoClose: 2000,
                            });
                        }
                    } else {
                        toast.update(toast_id, {
                            render: `Some fields are missing!`,
                            type: 'warning',
                            isLoading: false,
                            autoClose: 2000,
                        });
                    }
                } else {
                    toast.update(toast_id, {
                        render: `User Token is missing! Please sign in!`,
                        type: 'error',
                        isLoading: false,
                        autoClose: 2000,
                    });
                    navigate('/login');
                }
            }
        } catch (err) {
            toast.update(toast_id, {
                render: `User Token is missing! Please sign in!`,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
            navigate('/login');
        }
    };

    return (
        <main className="sa_main">
            <div className="sa_m_cont">
                <h1>Student Record</h1>
                <p>
                    Please fill the fields below with the appropraite
                    Information
                </p>
                <div className="sa_m_c_inputs">
                    <span>
                        <BasicTextEntry
                            title="First Name"
                            inputValue={firstName}
                            setInputValue={setFirstName}
                            placeHolder="John"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Last Name"
                            inputValue={lastName}
                            setInputValue={setLastName}
                            placeHolder="Doe"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Email"
                            inputValue={email}
                            setInputValue={setEmail}
                            placeHolder="johndoe@gmail.com"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Matric Number"
                            inputValue={matricNo}
                            setInputValue={setMatricNo}
                            placeHolder="CYS/07/1002"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Gender"
                            inputValue={gender}
                            setInputValue={setGender}
                            placeHolder="Gender"
                            isDropDown={true}
                            data_options={gender_data}
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Previous Health Condition"
                            inputValue={phc}
                            setInputValue={setPHC}
                            placeHolder="Sugar allergy..."
                            inputType={'text'}
                        />
                    </span>
                    <span>
                        <BasicTextEntry
                            title="Age"
                            inputValue={age}
                            setInputValue={setAge}
                            placeHolder="20"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Phone Number"
                            inputValue={phoneNo}
                            setInputValue={setPhoneNo}
                            placeHolder="080########"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Address"
                            inputValue={address}
                            setInputValue={setAddress}
                            placeHolder="Lane 4, Alagbaka, Akure."
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Blood Type"
                            inputValue={bloodType}
                            setInputValue={setBloodType}
                            placeHolder="Blood Type"
                            isDropDown={true}
                            data_options={blood_type}
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Blood Group"
                            inputValue={bloodGroup}
                            setInputValue={setBloodGroup}
                            placeHolder="Blood Group"
                            isDropDown={true}
                            data_options={blood_group}
                            inputType={'text'}
                        />
                    </span>
                </div>
                <BasicButton
                    marginTop={20}
                    marginBottom={10}
                    onClick={send_user_info}
                    title="Upload"
                />
            </div>
        </main>
    );
};

export default StudentAccountPage;
