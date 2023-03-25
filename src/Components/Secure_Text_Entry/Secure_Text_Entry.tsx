import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import './Secure_Text_Entry.scss';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface SecureTextEntryProps {
    title?: string;
    placeHolder?: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
}

const SecureTextEntry: FunctionComponent<SecureTextEntryProps> = ({
    title,
    placeHolder,
    inputValue,
    setInputValue,
}) => {
    const [showP, setShowP] = useState<boolean>(false);

    return (
        <section className="sti_main">
            <p className="s_m_title">{title}</p>
            <div className="s_m_input_cont">
                <input
                    type={showP ? 'text' : 'password'}
                    placeholder={placeHolder || ''}
                    className="s_m_input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    required
                />
                <span onClick={() => setShowP(!showP)} className="s_m_i_i">
                    {showP ? (
                        <FiEyeOff size={25} color="grey" />
                    ) : (
                        <FiEye size={25} color="grey" />
                    )}
                </span>
            </div>
        </section>
    );
};

export default SecureTextEntry;
