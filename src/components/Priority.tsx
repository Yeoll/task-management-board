import React from 'react';
import { getColor } from './enums/Priorities';
import PriorityProps from './props/PriorityProps';
import '../styles/Priority.scss';

const Priority: React.FC<PriorityProps> = (props) => {
    return (
        <>
            {props.isEdit && (
                <div
                    style={{
                        backgroundColor: getColor(props.priority),
                        borderColor: 'black',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                    }}
                    className="Priority"
                />
            )}

            {!props.isEdit && (
                <div
                    style={{ backgroundColor: getColor(props.priority) }}
                    className="Priority"
                />
            )}
        </>
    );
};

export default Priority;
