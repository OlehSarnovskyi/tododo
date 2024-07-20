import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

function Calendar() {
    return (
        <StaticDatePicker defaultValue={dayjs()}/>
    )
}

export default Calendar
