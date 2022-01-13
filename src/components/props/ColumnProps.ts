import CardType from '../models/CardType'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

interface ColumnProps {
    id: string
    title: string
    cards: CardType[]
    draggableHandleProps?: DraggableProvidedDragHandleProps
    onClickSaveTitle: (title: string) => void
    onClickRemoveColumn: (columnId: string) => void
    onClickSaveCard: (columnId:string, cards: CardType[]) => void
    onClickDeleteCard: (cardId: string) => void
    onClickAddCard: (columnId:string, cards: CardType[]) => void
}

export default ColumnProps
