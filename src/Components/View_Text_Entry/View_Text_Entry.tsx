import React, { FunctionComponent, HTMLInputTypeAttribute } from 'react';
import './View_Text_Entry.scss';

interface ViewTextEntryProps {
    title?: string;
    inputType: HTMLInputTypeAttribute;
    placeHolder?: string;
    inputValue: string | null | number;
}

const ViewTextEntry: FunctionComponent<ViewTextEntryProps> = ({
    title,
    inputType,
    placeHolder,
    inputValue,
}) => {
    return (
        <section className="vti_main">
            <p className="v_m_title">{title}</p>
            <input
                type={inputType}
                placeholder={placeHolder || ''}
                className="v_m_input"
                value={inputValue || ''}
                readOnly
            />
        </section>
    );
};

export default ViewTextEntry;
