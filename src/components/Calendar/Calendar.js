import './Calendar.css';
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function Calendar({getTodoList}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="Calendar">
                <StaticDatePicker
                    onChange={(date) => getTodoList(dayjs(date).format("DD.MM.YYYY"))}
                    slotProps={{
                        actionBar: {actions: ['today', 'clear']},
                    }}
                />
            </div>
        </LocalizationProvider>
    )
}

export default Calendar
