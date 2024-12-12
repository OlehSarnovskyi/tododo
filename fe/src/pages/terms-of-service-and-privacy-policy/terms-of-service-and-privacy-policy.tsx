import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

function Terms() {
    const navigate = useNavigate()
    return (
        <div className="terms">
            <h1>Terms of service and privacy policy</h1>
            <Link onClick={() => navigate('/')}>Back</Link>
        </div>
    )
}

export default Terms
