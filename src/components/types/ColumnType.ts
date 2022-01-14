import CardType from './CardType';

interface ColumnType {
    id: string;
    title: string;
    cards: CardType[];
}

export const isColumn = (column: any): column is ColumnType => {
    return !!column?.title && !!column?.cards;
};

export const isColumns = (columns: any[]): columns is CardType[] => {
    return columns.every((column) => isColumn(column));
};

export default ColumnType;
