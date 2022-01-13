import ReactDOM from 'react-dom'
import Board from './components/Board'
import './styles/Board.scss'

const App: React.FC = () => {
    const title = 'TASK MANAGEMENT BOARD'
    return <Board title={title} />
}

ReactDOM.render(<App />, document.querySelector('#root'))
