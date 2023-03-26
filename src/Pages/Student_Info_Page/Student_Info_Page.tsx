import React, { FunctionComponent, useMemo } from 'react';
import './Student_Info_Page.scss';
import ViewTextEntry from '../../Components/View_Text_Entry/View_Text_Entry';
import TempData from '../../Temp/Health_Centre_Data.json';
import { useParams } from 'react-router';

const StudentInfoPage: FunctionComponent = () => {
    const params = useParams();
    const student_id = params?.id ? parseInt(params.id) : 0;
    const data = useMemo(() => TempData, []);

    return (
        <main className="si_main">
            <div className="sa_m_cont">
                <h1>Student Information</h1>
                <p>
                    Below are the information for {data[student_id]?.matric_no}
                </p>
                <div className="sa_m_c_inputs">
                    <span>
                        <ViewTextEntry
                            title="First Name"
                            inputValue={`${data[
                                student_id
                            ]?.first_name[0]?.toUpperCase()}${data[
                                student_id
                            ]?.first_name.slice(1)}`}
                            placeHolder="John"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Last Name"
                            inputValue={`${data[
                                student_id
                            ]?.last_name[0]?.toUpperCase()}${data[
                                student_id
                            ]?.last_name.slice(1)}`}
                            placeHolder="Doe"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Email"
                            inputValue={data[student_id]?.email}
                            placeHolder="johndoe@gmail.com"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Matric Number"
                            inputValue={data[student_id]?.matric_no}
                            placeHolder="CYS/07/1002"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Gender"
                            inputValue={data[student_id]?.sex}
                            placeHolder="Gender"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Previous Health Condition"
                            inputValue={
                                data[student_id]?.previous_health_condition ||
                                ''
                            }
                            placeHolder="Sugar allergy..."
                            inputType={'text'}
                        />
                    </span>
                    <span>
                        <ViewTextEntry
                            title="Age"
                            inputValue={data[student_id]?.age}
                            placeHolder="20"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Phone Number"
                            inputValue={
                                parseInt(
                                    data[student_id]?.phone_no
                                        ?.toString()
                                        ?.slice(0, 1) as string,
                                ) === 0
                                    ? data[student_id]?.phone_no
                                    : `0${data[student_id]?.phone_no}`
                            }
                            placeHolder="080########"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Address"
                            inputValue={data[student_id]?.address}
                            placeHolder="Lane 4, Alagbaka, Akure."
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Blood Type"
                            inputValue={data[student_id]?.blood_type}
                            placeHolder="Blood Type"
                            inputType={'text'}
                        />
                        <ViewTextEntry
                            title="Blood Group"
                            inputValue={data[student_id]?.blood_group}
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
