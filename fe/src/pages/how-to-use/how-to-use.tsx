import './how-to-use.css';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

function HowToUse() {
    const navigate = useNavigate()
    return (
        <div className="how-to-use">
            <Link onClick={() => navigate('/')}>Go back</Link>
            <h1>How to Use TODODO</h1>
            <b>Welcome to TODODO! 🎉</b>
            <p>Managing your daily tasks has never been this simple or convenient — <b>all within Telegram!</b></p>
            <p>📱 Follow these simple tips to start managing your days:</p>
            <h2>1. Open it easily</h2>
            <ul>
                <li>Open Telegram and search for the <b>TODODO bot</b>.</li>
                <li>Click <b>“Open”</b> (from the chat preview) or <b>“Launch”</b> (in the bot) to access the app.</li>
                <li>For quicker access, add TODODO to your phone's home screen by selecting the <b>3-dot menu option</b> in the app.</li>
            </ul>
            <hr/>
            <h2>2. No need to create an account and login manually</h2>
            <ul>
                <li><b>Automatic Account Creation:</b> The first time you open TODODO, your account is created instantly using your Telegram data—no manual registration required.</li>
                <li><b>Seamless Login:</b> On future visits, you’ll log in automatically.</li>
            </ul>
            <hr/>
            <h2>3. Manage Your Task List</h2>
            <ul>
                <li><b>Create Tasks:</b> Tap the <b>"+ NEW TASK"</b> button to add tasks effortlessly.</li>
                <li><b>Edit or Delete Tasks:</b> Use the <b>3-dot menu</b> next to a task to make changes or remove it.</li>
                <li><b>Mark Tasks as Done:</b> Simply check the boxes to track completed tasks.</li>
            </ul>
            <hr/>
            <h2>4. Navigate Your Schedule with the Calendar</h2>
            <ul>
                <li><b>Switch Between Days:</b> Use the left and right arrows in the calendar to move between dates.</li>
                <li><b>Quick Navigation:</b> Click on the calendar to open a popup for selecting specific dates more efficiently.</li>
            </ul>
            <hr/>
            <p>
                <h3>Need Help or Have Suggestions?</h3>
                <span>We’re here to assist! Reach out to:</span>
                <br/>
                <b>Admin:</b> <a href="https://t.me/oleh_srn">@oleh_srn</a>
            </p>
            <hr/>
            <i><b>Thank you for choosing TODODO!</b> 🌟 We’re excited to help you stay organized and conquer your day!</i>
        </div>
    )
}

export default HowToUse
