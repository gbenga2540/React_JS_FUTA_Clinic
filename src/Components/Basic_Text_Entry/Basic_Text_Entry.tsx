import React, {
    Dispatch,
    FunctionComponent,
    HTMLInputTypeAttribute,
    SetStateAction,
} from 'react';
import './Basic_Text_Entry.scss';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface BasicTextEntryProps {
    title?: string;
    inputType: HTMLInputTypeAttribute;
    placeHolder?: string;
    isDropDown?: boolean;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    data_options?: any[];
}

const BasicTextEntry: FunctionComponent<BasicTextEntryProps> = ({
    title,
    inputType,
    placeHolder,
    isDropDown,
    inputValue,
    setInputValue,
    data_options,
}) => {
    const data: any[] = data_options ? data_options : [];
    return (
        <section className="bti_main">
            <p className="b_m_title">{title}</p>
            {isDropDown ? (
                <Dropdown
                    options={data}
                    value={inputValue}
                    onChange={e => setInputValue(e.value)}
                    placeholder={'Select'}
                />
            ) : (
                <input
                    type={inputType}
                    placeholder={placeHolder || ''}
                    className="b_m_input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    required
                />
            )}
        </section>
    );
};

export default BasicTextEntry;
