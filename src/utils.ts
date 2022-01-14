import { DropResult } from 'react-beautiful-dnd';
import ColumnType from './components/types/ColumnType';

export const reorder = <T>(
    sourceIndex: number,
    destinationIndex: number,
    data: T[]
): T[] => {
    const reorderedData = [...data];
    const [removed] = reorderedData.splice(sourceIndex, 1);
    reorderedData.splice(destinationIndex, 0, removed);

    return reorderedData;
};

export const move = (
    dropResult: DropResult,
    columns: ColumnType[]
): ColumnType[] => {
    const { source, destination } = dropResult || {};
    if (!source || !destination) return columns;

    const { droppableId: srcDroppableId, index: srcIndex } = source;
    const { droppableId: destDroppableId, index: destIndex } = destination;

    const sourceColumn = columns.find((column) => column.id === srcDroppableId);
    const movingCard = sourceColumn?.cards.find(
        (card, idx) => idx === srcIndex
    );
    if (!movingCard) return columns;

    return columns.map((column) => {
        if (![srcDroppableId, destDroppableId].includes(column.id))
            return column;

        if (column.id === srcDroppableId) {
            return {
                ...column,
                cards: column.cards.filter((card, idx) => idx !== srcIndex),
            };
        } else {
            const cards = [...column.cards];
            cards.splice(destIndex, 0, movingCard);
            return {
                ...column,
                cards,
            };
        }
    });
};
