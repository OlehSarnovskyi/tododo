import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";

function App() {
    function getTodoList(date: string): void {
        console.log('api call get by date', date)
    }

    return (
        <div className="app">
            <Calendar getTodoList={getTodoList}/>
            <TodoList/>
        </div>
    )
}

export default App
