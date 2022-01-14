import { Priorities } from '../enums/Priorities';

interface CardType {
    id: string;
    columnId: string;
    priority: Priorities;
    content: string;
}

export const isCard = (card: any): card is CardType => {
    return !!card?.columnId && !!card?.priority && !!card?.content;
};

export const isCards = (cards: any[]): cards is CardType[] => {
    return cards.every((card) => isCard(card));
};

export default CardType;
