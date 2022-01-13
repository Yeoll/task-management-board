import React, { useEffect, useState } from 'react'
import AddCardButton from './AddCardButton'
import Card from './Card'
import AddCard from './AddCard'
import Modal from './Modal'
import ColumnProps from './props/ColumnProps'
import { CardType } from './Board'
import { v4 as uuid } from 'uuid'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import '../styles/Column.scss'
import '../styles/AddCard.scss'

const Column: React.FC<ColumnProps> = (props) => {
    const [cards, setCards] = useState<CardType[]>(props.cards)
    const [title, setTitle] = useState<string>(props.title)
    const [isAddingCard, setIsAddingCard] = useState<boolean>(false)
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

    useEffect(() => {
        setCards(props.cards)   
    }, [props.cards])
    
    const renderCards = (cards: CardType[]) => {
        return cards.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Card
                            key={card.id}
                            id={card.id}
                            card={card}
                            onClickSave={(content, priority) => {
                                const newCards = [...cards];
                                const updateCard = newCards.find((c) => c.id === card.id)
                                if (!updateCard) return;
                                updateCard.content = content;
                                updateCard.priority = priority;
                                setCards(newCards)
                                props.onClickSaveCard(props.id, cards)
                            }}
                            onClickDelete={(value) => {
                                setCards(
                                    cards.filter((card) => card.id !== value)
                                )
                                props.onClickDeleteCard(card.id)
                            }}
                        />
                    </div>
                )}
            </Draggable>
        ))
    }

    const onClickTitle = () => {
        setIsEditingTitle(true)
    }

    const onClickRemove = () => {
        setIsModalOpened(true)
    }

    const onMouseOver = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const question = 'Do you want to remove ' + props.title + '?'

    return (
        <div className="Column">
            {isEditingTitle ? (
                <>
                    <input
                        className="Input"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <button
                        className="Button"
                        onClick={(e) => {
                            e.preventDefault()
                            if (!title) return
                            setIsEditingTitle(false)
                            props.onClickSaveTitle(title)
                        }}
                    >
                        Save
                    </button>
                </>
            ) : (
                <div
                    className="ColumnHeader"
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                >
                    <div
                        className="ColumnTitle"
                        onClick={onClickTitle}
                        {...props.draggableHandleProps}
                    >
                        {title}
                    </div>
                    {isMouseOver && (
                        <div className="ColumnIcon" onClick={onClickRemove}>
                            <i className="trash alternate outline icon CustomIcon"></i>
                        </div>
                    )}
                </div>
            )}
            <Droppable droppableId={props.id} type="CARD">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...(provided.droppableProps ?? {})}
                    >
                        {renderCards(cards)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {isAddingCard && (
                <AddCard
                    onClickSave={(content, priority) => {
                        setIsAddingCard(false)
                        if (content === '') return
                        const newCards = [
                            ...cards,
                            {
                                id: uuid(),
                                columnId: props.id,
                                priority: priority,
                                content: content,
                            },
                        ]
                        setCards(newCards)
                        props.onClickAddCard(props.id, newCards)
                    }}
                />
            )}
            {!isAddingCard && (
                <AddCardButton
                    columnKey={props.id}
                    onAddButtonClick={() => {
                        setIsAddingCard(true)
                    }}
                />
            )}
            {isModalOpened && (
                <Modal
                    question={question}
                    onClickConfirm={() => {
                        setIsModalOpened(false)
                        props.onClickRemoveColumn(props.id)
                    }}
                    onClickCancel={() => {
                        setIsModalOpened(false)
                    }}
                />
            )}
        </div>
    )
}

export default Column
