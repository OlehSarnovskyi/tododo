import './how-to-use.css';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

function HowToUse() {
    const navigate = useNavigate()
    return (
        <div className="how-to-use">
            <Link onClick={() => navigate('/')}>Go back</Link>
            <h1>How to use TODODO</h1>
            <p>One list per day, right inside Telegram. Here is everything the app can do.</p>

            <h2>Opening it</h2>
            <ul>
                <li>Launch TODODO from the bot chat — it opens instantly, nothing to install.</li>
                <li>Your account is created on first launch from your Telegram profile. There is no password to remember.</li>
                <li>To keep it one tap away, add it to your home screen from the app's 3-dot menu.</li>
            </ul>
            <hr/>

            <h2>Adding and editing tasks</h2>
            <ul>
                <li><b>Add:</b> tap <b>+ NEW TASK</b>, type, and press Enter.</li>
                <li><b>Edit or delete:</b> open the <b>⋮</b> menu next to a task.</li>
                <li><b>Reorder:</b> drag a task by the handle on the left to set your priorities. The order is saved.</li>
            </ul>
            <hr/>

            <h2>Tracking what you are working on</h2>
            <p>Tap the circle next to a task to move it through three states:</p>
            <ul>
                <li><b>To do</b> — an empty circle. Not started yet.</li>
                <li><b>In progress</b> — a half-filled circle. The task is highlighted so you can see at a glance what you picked up today.</li>
                <li><b>Done</b> — a check. The task is crossed out.</li>
            </ul>
            <p>Tapping again cycles back to the start, so nothing is ever stuck in the wrong state.</p>
            <hr/>

            <h2>Moving between days</h2>
            <ul>
                <li>Use the arrows, or swipe left and right across the date.</li>
                <li>Tap the date to jump to any day in the calendar.</li>
                <li><b>Didn't get to it?</b> Choose <b>Tomorrow</b> in the <b>⋮</b> menu and the task moves to the next day.</li>
            </ul>
            <hr/>

            <h2>Your privacy</h2>
            <ul>
                <li>Task text is <b>encrypted before it is stored</b>, so it is unreadable in the database.</li>
                <li>Every request is verified against Telegram's signature — nobody can read or change your list by pretending to be you.</li>
            </ul>
            <hr/>

            <h3>Questions or ideas?</h3>
            <p>Write to <a href="https://t.me/oleh_srn">@oleh_srn</a> — feedback genuinely shapes what gets built next.</p>
        </div>
    )
}

export default HowToUse
