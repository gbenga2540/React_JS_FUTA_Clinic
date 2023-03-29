import React, { FunctionComponent } from 'react';
import './Basic_Button.scss';

interface BasicButtonProps {
    title: string;
    marginTop?: number | string;
    marginBottom?: number;
    onClick: () => void;
    disableButton?: boolean;
}
const BasicButton: FunctionComponent<BasicButtonProps> = ({
    title,
    marginTop,
    marginBottom,
    onClick,
    disableButton,
}) => {
    return (
        <button
            style={{
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
            }}
            disabled={disableButton || false}
            onClick={() => onClick()}
            className="btn_main">
            {title}
        </button>
    );
};

export default BasicButton;
