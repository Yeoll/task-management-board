import React, { useState } from 'react'
import Priority from './Priority'
import Modal from './Modal'
import { Priorities } from './enums/Priorities'
import CardProps from './props/CardProps'
import '../styles/Card.scss'
import '../styles/Column.scss'

const Card: React.FC<CardProps> = (props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [content, setContent] = useState<string>(props.card.content)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [priority, setPriority] = useState<Priorities>(props.card.priority)
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

    const onClickPriority = () => {
        setPriority((priority + 1) % 4)
    }

    const onClickEdit = () => {
        setIsEditing(true)
    }

    const onClickDelete = () => {
        setIsModalOpened(true)
    }

    const onMouseOver = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const question = 'Do you want to remove [' + props.card.content + ']?'

    return (
        <>
            <div className="Card">
                {isEditing ? (
                    <>
                        <div className="Modal"></div>
                        <div className="EditWindow">
                            <div
                                className="PriorityHeader"
                                onClick={onClickPriority}
                            >
                                <Priority
                                    priority={priority}
                                    isEdit={isEditing}
                                />
                            </div>
                            <textarea
                                className="TextArea"
                                onChange={(e) => {
                                    setContent(e.target.value)
                                }}
                                defaultValue={content}
                            ></textarea>
                            <div className="">
                                <button
                                    className="Button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsEditing(false)
                                        setIsMouseOver(false)
                                        props.onClickSave(content, priority)
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="Button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsEditing(false)
                                        setIsMouseOver(false)
                                        onClickDelete()
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="CardHeader"
                            onMouseOver={onMouseOver}
                            onMouseLeave={onMouseLeave}
                        >
                            <Priority
                                priority={props.card.priority}
                                isEdit={isEditing}
                            />
                            {isMouseOver && (
                                <div className="CardIcon" onClick={onClickEdit}>
                                    <i className="edit icon CustomIcon"></i>
                                </div>
                            )}
                        </div>
                        {content}
                    </>
                )}
            </div>
            {isModalOpened && (
                <Modal
                    question={question}
                    onClickConfirm={() => {
                        setIsModalOpened(false)
                        props.onClickDelete(props.card.id)
                    }}
                    onClickCancel={() => {
                        setIsModalOpened(false)
                    }}
                />
            )}
        </>
    )
}

export default Card
