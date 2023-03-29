import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import './Student_Info_Page.scss';
import ViewTextEntry from '../../Components/View_Text_Entry/View_Text_Entry';
import { useNavigate, useParams } from 'react-router';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { StudentInfoProps } from '../../Interface/Student_Info';

const StudentInfoPage: FunctionComponent = () => {
    const params = useParams();
    const navigate = useNavigate();
    const student_id = params?.id ? params.id : '';
    const [studentInfo, setStudentInfo] = useState<StudentInfoProps>({
        first_name: '',
        last_name: '',
        address: '',
        age: '',
        blood_group: '',
        blood_type: '',
        email: '',
        gender: '',
        matric_no: '',
        phone_no: '',
        phc: '',
    });

    useEffect(() => {
        const get_student_with_id = () => {
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
                        try {
                            Axios.get(
                                `${process.env.REACT_APP_REST_API}/students/${student_id}`,
                                {
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
                                        setStudentInfo(res?.data?.response);
                                        toast.update(toast_id, {
                                            render: "Student's Information Loaded!",
                                            type: 'success',
                                            isLoading: false,
                                            autoClose: 1000,
                                        });
                                    } else if (res?.data?.status === 'error') {
                                        toast.update(toast_id, {
                                            render: res?.data?.code,
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    } else {
                                        toast.update(toast_id, {
                                            render: "Error loading Student's Information!",
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    }
                                });
                        } catch (error) {
                            toast.update(toast_id, {
                                render: "Error loading Student's Information!",
                                type: 'error',
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
        get_student_with_id();
    }, []);

    return (
        <main className="si_main">
            <div className="sa_m_cont">
                <h1>Student Information</h1>
                <p>Below are the information for {studentInfo?.matric_no}</p>
                <div className="sa_m_c_inputs">
                    <span>
                        <ViewTextEntry
                            title="First Name"
                            inputValue={`${
                                studentInfo?.first_name
                                    ? studentInfo?.first_name[0]?.toUpperCase()
                                    : ''
                            }${
                                studentInfo?.first_name
                                    ? studentInfo?.first_name.slice(1)
                                    : ''
                            }`}
                            placeHolder="John"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Last Name"
                            inputValue={`${
                                studentInfo?.last_name
                                    ? studentInfo?.last_name[0]?.toUpperCase()
                                    : ''
                            }${
                                studentInfo?.last_name
                                    ? studentInfo?.last_name.slice(1)
                                    : ''
                            }`}
                            placeHolder="Doe"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Email"
                            inputValue={studentInfo?.email}
                            placeHolder="johndoe@gmail.com"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Matric Number"
                            inputValue={studentInfo?.matric_no}
                            placeHolder="CYS/07/1002"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Gender"
                            inputValue={studentInfo?.gender}
                            placeHolder="Gender"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Previous Health Condition"
                            inputValue={studentInfo?.phc || ''}
                            placeHolder="Sugar allergy..."
                            inputType={'text'}
                        />
                    </span>
                    <span>
                        <ViewTextEntry
                            title="Age"
                            inputValue={studentInfo?.age}
                            placeHolder="20"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Phone Number"
                            inputValue={
                                parseInt(
                                    studentInfo?.phone_no
                                        ?.toString()
                                        ?.slice(0, 1) as string,
                                ) === 0
                                    ? studentInfo?.phone_no
                                    : `0${studentInfo?.phone_no}`
                            }
                            placeHolder="080########"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Address"
                            inputValue={studentInfo?.address}
                            placeHolder="Lane 4, Alagbaka, Akure."
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Blood Type"
                            inputValue={studentInfo?.blood_type}
                            placeHolder="Blood Type"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Blood Group"
                            inputValue={studentInfo?.blood_group}
                            placeHolder="Blood Group"
                            inputType={'text'}
                        />
                    </span>
                </div>
            </div>
        </main>
    );
};

export default StudentInfoPage;
