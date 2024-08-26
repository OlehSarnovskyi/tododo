import './Calendar.css';
import {LocalizationProvider, PickerValidDate, StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function Calendar({date, getTodoList}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as PickerValidDate}>
            <div className="calendar">
                <StaticDatePicker
                    defaultValue={dayjs(date) as PickerValidDate}
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
