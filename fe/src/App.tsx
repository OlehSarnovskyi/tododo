import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import {getList} from "./services/local-storage.service";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

function App() {
    const [date, setDate] = useState(dayjs())
    const [listByDate, setListByDate] = useState({})

    function login() {
        console.log('login');
        fetch('http://localhost:3000/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Telegram.WebApp.initDataUnsafe.user.id
            }),
        }).then((res) => console.log(res.json()))
    }

    useEffect(() => {
        login()
    }, [])
    
    useEffect(() => {
        getTodoList(dayjs(date).format('DD.MM.YYYY'))
    }, [date])

    function getTodoList(date: string): void {
        setListByDate(getList().find(list => list.date === date)!)
    }

    return (
        <div className="app">
            Your name is {Telegram.WebApp.initDataUnsafe.user.first_name}
            <hr/>
            Your user.id is {Telegram.WebApp.initDataUnsafe.user.id}
            <hr/>
            <div>
                <Calendar date={date} setDate={setDate}/>
                <TodoList date={date} list={listByDate}/>
            </div>
        </div>
    )
}

export default App
