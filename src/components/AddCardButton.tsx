import React from 'react'
import AddCardButtonProps from './props/AddCardButtonProps'
import '../styles/AddCardButton.scss'

const AddCardButton: React.FC<AddCardButtonProps> = (props) => {
    return (
        <div className="AddButton" onClick={props.onAddButtonClick}>
            + Add another card
        </div>
    )
}

export default AddCardButton
