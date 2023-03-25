import React, { FunctionComponent, useState } from 'react';
import './Student_Account_Page.scss';
import {
    blood_group,
    blood_type,
    gender_data,
} from '../../Data/Student_Account_Info';
import { StudentInfoProps } from '../../Interface/Student_Info';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const StudentAccountPage: FunctionComponent = () => {
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
        const userInfo: StudentInfoProps = {
            firstName,
            lastName,
            email,
            matricNo,
            age,
            gender,
            phoneNo,
            address,
            phc,
            bloodType,
            bloodGroup,
        };
        console.log(userInfo);
    };

    return (
        <main className="sa_main">
            <div className="sa_m_cont">
                <h1>Student Account</h1>
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
                            placeHolder="Malaria..."
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
                    title="Submit"
                />
            </div>
        </main>
    );
};

export default StudentAccountPage;
