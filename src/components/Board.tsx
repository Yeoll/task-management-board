import React, { useState, useEffect } from 'react'
import Column from './Column'
import BoardProps from './props/BoardProps'
import { Priorities } from './enums/Priorities'
import CardType from './models/CardType'
import ColumnType from './models/ColumnType'
import AddColumn from './AddColumn'
import { v4 as uuid } from 'uuid'
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd'
import '../styles/Board.scss'

const colId1 = uuid()
const colId2 = uuid()
const colId3 = uuid()

const data_cards: CardType[] = [
    {
        id: uuid(),
        columnId: colId1,
        priority: Priorities.Green,
        content: 'This is a Todo list with items that can be marked off',
    },
    {
        id: uuid(),
        columnId: colId1,
        priority: Priorities.Yellow,
        content:
            'You can categorize each item with a Color(Red, Yellow, Green)',
    },
    {
        id: uuid(),
        columnId: colId1,
        priority: Priorities.Red,
        content: 'Hover over an item to Edit the text',
    },
    {
        id: uuid(),
        columnId: colId2,
        priority: Priorities.None,
        content: 'You can click and drag items up and down the list',
    },
    {
        id: uuid(),
        columnId: colId2,
        priority: Priorities.None,
        content: 'As well as drag items from one column to the other',
    },
    {
        id: uuid(),
        columnId: colId3,
        priority: Priorities.None,
        content: 'As well as rename the Columns',
    },
]

const data_columns: ColumnType[] = [
    {
        id: colId1,
        title: 'Column 1',
        cards: data_cards.filter((card) => card.columnId === colId1),
    },
    {
        id: colId2,
        title: 'Column 2',
        cards: data_cards.filter((card) => card.columnId === colId2),
    },
    {
        id: colId3,
        title: 'Done',
        cards: data_cards.filter((card) => card.columnId === colId3),
    },
]

const Board: React.FC<BoardProps> = (props) => {
    const [title] = useState<string>(props.title)
    const [columns, setColumns] = useState<ColumnType[]>([])

    useEffect(() => {
        if ('data_columns' in localStorage) {
            setColumns(JSON.parse(localStorage.getItem('data_columns')!))
        } else {
            localStorage.setItem('data_columns', JSON.stringify(data_columns))
            setColumns(data_columns)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('data_columns', JSON.stringify(columns))
    }, [columns])

    const renderColumns = columns.map((column, index) => {
        return (
            <Draggable key={column.id} draggableId={column.id} index={index}>
                {(provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            draggableHandleProps={provided.dragHandleProps}
                            cards={column.cards}
                            onClickSaveTitle={(value) => {
                                if (
                                    !columns.find((col) => col.id === column.id)
                                )
                                    return
                                ;(
                                    columns.find(
                                        (col) => col.id === column.id
                                    ) as ColumnType
                                ).title = value
                            }}
                            onClickRemoveColumn={(value) => {
                                if (!columns.find((col) => col.id === value))
                                    return
                                setColumns(
                                    columns.filter((col) => col.id !== value)
                                )
                            }}
                            onClickDeleteCard={(value) => {
                                const targetColumn = columns.find(
                                    (col) => col.id === column.id
                                )
                                if (!targetColumn) return

                                targetColumn.cards = targetColumn.cards.filter(
                                    (card) => card.id !== value
                                )
                                const tempColumns = Array.from(columns)
                                const index = tempColumns.indexOf(targetColumn)
                                const [reArrangedColums] = tempColumns.splice(
                                    index,
                                    1
                                )
                                tempColumns.splice(index, 0, reArrangedColums)
                                setColumns(tempColumns)
                                console.log(columns)
                            }}
                        />
                    </div>
                )}
            </Draggable>
        )
    })

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        if (!result.destination) return

        if (result.type === 'COLUMN') {
            const tempColumns = Array.from(columns)
            const [reArrangedColums] = tempColumns.splice(
                result.source.index,
                1
            )
            tempColumns.splice(result.destination.index, 0, reArrangedColums)
            setColumns(tempColumns)
        } else if (
            result.type === 'CARD' &&
            result.source.droppableId === result.destination.droppableId
        ) {
            const targetColumn = columns.find(
                (col) => col.id === result.source.droppableId
            )
            if (!targetColumn) return
            const tempCards = Array.from(targetColumn.cards)
            const [reArrangedCards] = tempCards.splice(result.source.index, 1)
            tempCards.splice(result.destination.index, 0, reArrangedCards)

            console.log(tempCards)

            const tempColumns = Array.from(columns)
            const index = tempColumns.indexOf(targetColumn)
            targetColumn.cards = tempCards
            const [reArrangedColums] = tempColumns.splice(index, 1)
            tempColumns.splice(index, 0, reArrangedColums)
            setColumns(tempColumns)

            console.log(columns)
        } else if (
            result.type === 'CARD' &&
            result.source.droppableId !== result.destination.droppableId
        ) {
            if (!result.destination) return
            const sourceColumn = columns.find(
                (col) => col.id === result.source.droppableId
            )
            if (!sourceColumn) return
            const destinationColumn = columns.find(
                (col) => col.id === result.destination!.droppableId
            )
            if (!destinationColumn) return

            const targetCard = sourceColumn.cards.find(
                (card) => card.id === result.draggableId
            )
            if (!targetCard) return

            const tempColumns = Array.from(columns)
            const sourceColumnindex = tempColumns.indexOf(sourceColumn)
            sourceColumn.cards = sourceColumn.cards.filter(
                (card) => card.id !== result.draggableId
            )
            const [reArrangedColums] = tempColumns.splice(sourceColumnindex, 1)
            tempColumns.splice(sourceColumnindex, 0, reArrangedColums)

            const tempCards = Array.from(destinationColumn.cards)
            tempCards.splice(result.destination.index, 0, targetCard)
            destinationColumn.cards = tempCards

            const desinationColumnIndex = tempColumns.indexOf(destinationColumn)
            const [reArrangedColums2] = tempColumns.splice(
                desinationColumnIndex,
                1
            )
            tempColumns.splice(desinationColumnIndex, 0, reArrangedColums2)
            setColumns(tempColumns)

            console.log(columns)
        }
    }

    return (
        <div className="Board">
            <div className="BoardTitle">{title}</div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId="columns"
                    direction="horizontal"
                    type="COLUMN"
                >
                    {(provided) => (
                        <div
                            className="BoardContent"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {renderColumns}
                            {provided.placeholder}

                            <AddColumn
                                onClickSave={(value) => {
                                    setColumns((columns) => {
                                        return [
                                            ...columns,
                                            {
                                                id: uuid(),
                                                title: value,
                                                cards: [],
                                            },
                                        ]
                                    })
                                }}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Board
export type { CardType }
