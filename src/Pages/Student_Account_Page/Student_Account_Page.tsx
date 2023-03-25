import React, { FunctionComponent, useState } from 'react';
import './Student_Account_Page.scss';
import { student_gender_data } from '../../Data/Student_Account_Info';
import { StudentInfoProps } from '../../Interface/Student_Info';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const StudentAccountPage: FunctionComponent = () => {
    const [fullName, setFullName] = useState<string>('');
    const [matricNo, setMatricNo] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>(student_gender_data[0]);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const send_user_info = () => {
        const userInfo: StudentInfoProps = {
            fullName,
            matricNo,
            age,
            gender,
            phoneNo,
            address,
        };
        console.log(userInfo);
    };

    return (
        <main className="sa_main">
            <div className="sa_m_cont">
                <h1>Welcome to the Student Account</h1>
                <p>
                    Please fill the fields below with the appropraite
                    Information
                </p>
                <div className="sa_m_c_inputs">
                    <span>
                        <BasicTextEntry
                            title="Full Name"
                            inputValue={fullName}
                            setInputValue={setFullName}
                            placeHolder="John Doe"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Matric Number"
                            inputValue={matricNo}
                            setInputValue={setMatricNo}
                            placeHolder="CYS/10/1002"
                            inputType={'text'}
                        />
                        <BasicTextEntry
                            title="Gender"
                            inputValue={gender}
                            setInputValue={setGender}
                            placeHolder="Gender"
                            isDropDown={true}
                            data_options={student_gender_data}
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
                    </span>
                </div>
                <BasicButton
                    marginTop={20}
                    marginBottom={60}
                    onClick={send_user_info}
                    title="Send"
                />
            </div>
        </main>
    );
};

export default StudentAccountPage;
