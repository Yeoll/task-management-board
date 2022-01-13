import { Priorities } from '../enums/Priorities'

interface CardType {
    id: string
    columnId: string
    priority: Priorities
    content: string
}

export default CardType
