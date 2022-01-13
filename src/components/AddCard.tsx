import React, { useState } from 'react'
import Priority from './Priority'
import { Priorities } from './enums/Priorities'
import '../styles/AddCard.scss'

interface AddCardProps {
    onClickSave: (content: string, priority: Priorities) => void
}

const AddCard: React.FC<AddCardProps> = (props) => {
    const [content, setContent] = useState<string>('')
    const [priority, setPriority] = useState<Priorities>(Priorities.None)

    const onClickPriority = () => {
        setPriority((priority + 1) % 4)
    }

    return (
        <div>
            <div className="PriorityHeader" onClick={onClickPriority}>
                <Priority priority={priority} isEdit={true} />
            </div>
            <textarea
                className="TextArea"
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            ></textarea>
            <br />
            <button
                className="Button"
                onClick={(e) => {
                    e.preventDefault()
                    if (!content) return
                    props.onClickSave(content, priority)
                }}
            >
                Save
            </button>
            <button
                className="Button"
                onClick={(e) => {
                    e.preventDefault()
                    setContent('')
                    props.onClickSave('', priority)
                }}
            >
                Cancel
            </button>
        </div>
    )
}

export default AddCard
