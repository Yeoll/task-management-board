import { Priorities } from '../enums/Priorities';
import CardType from '../types/CardType';

interface CardProps {
    id: string;
    card: CardType;
    onClickSave: (content: string, priority: Priorities) => void;
    onClickDelete: (cardId: string) => void;
}

export default CardProps;
