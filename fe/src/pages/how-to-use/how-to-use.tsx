import './how-to-use.css';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

function HowToUse() {
    const navigate = useNavigate()
    return (
        <div className="how-to-use">
            <Link onClick={() => navigate('/')}>Go back</Link>
            <h1>Some text h1</h1>
            <p>
                ppppppp
            </p>
            <hr/>
            <p>
                <i>If you still need help or have any suggestions, please, don't hesitate react out to:</i>
                <br/>
                <b>Admin:</b> <a href="https://t.me/oleh_srn">@oleh_srn</a>
            </p>
            <i>Thank you for using TODODO!</i>
        </div>
    )
}

export default HowToUse
