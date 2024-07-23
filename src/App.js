import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";

function App() {
    function getTodoList(date) {
        console.log('api call get by date', date)
    }

    return (
        <div className="App">
            <Calendar getTodoList={getTodoList}/>
            <TodoList/>
        </div>
    )
}

export default App;
