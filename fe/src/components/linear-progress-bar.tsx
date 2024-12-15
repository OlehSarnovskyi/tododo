import { LinearProgress } from '@mui/material';
import {useLoading} from "../services/loading.service";

const LinearProgressBar = () => {
    const { isLoading } = useLoading()

    return isLoading && <LinearProgress color="inherit" />
};

export default LinearProgressBar
