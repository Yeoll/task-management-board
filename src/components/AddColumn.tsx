import React, { useState } from 'react';
import AddColumnProps from './props/AddColumnProps';
import '../styles/Column.scss';
import '../styles/AddCardButton.scss';

const AddColumn: React.FC<AddColumnProps> = (props) => {
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onClick = () => {
        setIsAddingColumn(true);
    };

    return (
        <div className="Column">
            {isAddingColumn ? (
                <>
                    <input
                        className="Input"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <button
                        className="Button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!title) return;
                            setTitle('');
                            setIsAddingColumn(false);
                            props.onClickSave(title);
                        }}
                    >
                        Save
                    </button>
                </>
            ) : (
                <div className="AddButton" onClick={onClick}>
                    + Add another column
                </div>
            )}
        </div>
    );
};

export default AddColumn;
