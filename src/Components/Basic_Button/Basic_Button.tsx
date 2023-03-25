import React, { FunctionComponent } from 'react';
import './Basic_Button.scss';

interface BasicButtonProps {
    title: string;
    marginTop?: number;
    marginBottom?: number;
    onClick: () => void;
}
const BasicButton: FunctionComponent<BasicButtonProps> = ({
    title,
    marginTop,
    marginBottom,
    onClick,
}) => {
    return (
        <button
            style={{
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
            }}
            onClick={() => onClick()}
            className="btn_main">
            {title}
        </button>
    );
};

export default BasicButton;
