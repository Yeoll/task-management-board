import CardType from '../models/CardType'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

interface ColumnProps {
    id: string
    title: string
    cards: CardType[]
    draggableHandleProps?: DraggableProvidedDragHandleProps
    onClickSaveTitle: (title: string) => void
    onClickRemoveColumn: (columnId: string) => void
    onClickDeleteCard: (cardId: string) => void
}

export default ColumnProps
