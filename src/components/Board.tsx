import React, { useState, useEffect } from 'react';
import Column from './Column';
import BoardProps from './props/BoardProps';
import { Priorities } from './enums/Priorities';
import CardType from './types/CardType';
import ColumnType from './types/ColumnType';
import AddColumn from './AddColumn';
import { v4 as uuid } from 'uuid';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import '../styles/Board.scss';
import { reorder, move } from '../utils';
import Search from './Search';

const colId1 = uuid();
const colId2 = uuid();
const colId3 = uuid();

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
];

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
];

const Board: React.FC<BoardProps> = (props) => {
    const [title] = useState<string>(props.title);
    const [orgColumns, setOrgColumns] = useState<ColumnType[]>([]);
    const [columns, setColumns] = useState<ColumnType[]>([]);

    useEffect(() => {
        if ('data_columns' in localStorage) {
            const orgColumns = JSON.parse(
                localStorage.getItem('data_columns')!
            );
            setColumns(orgColumns);
            setOrgColumns(orgColumns);
        } else {
            localStorage.setItem('data_columns', JSON.stringify(data_columns));
            setColumns(data_columns);
            setOrgColumns(data_columns);
        }
    }, []);

    useEffect(() => {
        const updatingColumns = JSON.stringify(columns);
        localStorage.setItem('data_columns', updatingColumns);
    }, [columns]);

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
                                const tempColumns = [...columns];
                                const targetColumn = columns.find(
                                    (col) => col.id === column.id
                                );
                                if (!targetColumn) return;

                                targetColumn!.title = value;

                                setColumns(tempColumns);
                            }}
                            onClickRemoveColumn={(value) => {
                                if (!columns.find((col) => col.id === value))
                                    return;
                                setColumns(
                                    columns.filter((col) => col.id !== value)
                                );
                            }}
                            onClickSaveCard={(columnId, cards) => {
                                const tempColumns = [...columns];
                                const targetColumn = columns.find(
                                    (col) => col.id === columnId
                                );
                                if (!targetColumn) return;
                                targetColumn.cards = cards;
                                const index = columns.indexOf(targetColumn);
                                targetColumn.cards = cards;
                                const [reArrangedColums] = tempColumns.splice(
                                    index,
                                    1
                                );
                                tempColumns.splice(index, 0, reArrangedColums);
                                setColumns(tempColumns);
                            }}
                            onClickDeleteCard={(value) => {
                                const targetColumn = columns.find(
                                    (col) => col.id === column.id
                                );
                                if (!targetColumn) return;

                                targetColumn.cards = targetColumn.cards.filter(
                                    (card) => card.id !== value
                                );
                                const tempColumns = Array.from(columns);
                                const index = tempColumns.indexOf(targetColumn);
                                const [reArrangedColums] = tempColumns.splice(
                                    index,
                                    1
                                );
                                tempColumns.splice(index, 0, reArrangedColums);
                                setColumns(tempColumns);
                            }}
                            onClickAddCard={(columnId, cards) => {
                                const tempColumns = [...columns];
                                const targetColumn = columns.find(
                                    (col) => col.id === columnId
                                );
                                if (!targetColumn) return;
                                targetColumn.cards = cards;
                                const index = columns.indexOf(targetColumn);
                                targetColumn.cards = cards;
                                const [reArrangedColums] = tempColumns.splice(
                                    index,
                                    1
                                );
                                tempColumns.splice(index, 0, reArrangedColums);
                                setColumns(tempColumns);
                            }}
                        />
                    </div>
                )}
            </Draggable>
        );
    });

    const onDragEnd = (result: DropResult) => {
        console.log(result);
        if (!result.destination) return;

        switch (result.type) {
            case 'COLUMN':
                const reorderedColumns = reorder<ColumnType>(
                    result.source.index,
                    result.destination.index,
                    columns
                );
                setColumns(reorderedColumns);
                break;

            case 'CARD':
                const isSameColumn =
                    result.source.droppableId ===
                    result.destination.droppableId;
                if (isSameColumn) {
                    setColumns((columns) => {
                        return columns.map((column) => {
                            if (column.id !== result.source.droppableId)
                                return column;

                            return {
                                ...column,
                                cards: reorder<CardType>(
                                    result.source.index,
                                    result.destination!.index,
                                    column.cards
                                ),
                            };
                        });
                    });
                } else {
                    setColumns((columns) => {
                        return move(result, columns);
                    });
                }
                break;
        }
    };

    const onSearch = (searchBy: string) => {
        if (!searchBy) setColumns(orgColumns);

        const updatingColumns = orgColumns.map((column) => ({
            ...column,
            cards: column.cards.filter((card) =>
                card.content.toLowerCase().includes(searchBy.toLowerCase())
            ),
        }));
        setColumns(updatingColumns);
    };

    return (
        <div className="Board">
            <div className="BoardTitle">
                {title} <Search onSearch={onSearch} />
            </div>

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
                                        ];
                                    });
                                }}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Board;
