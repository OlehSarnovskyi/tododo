import './Calendar.css';
import {LocalizationProvider, MobileDatePicker, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function Calendar({date, setDate}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as PickerValidDate}>
            <div className="calendar">
                <MobileDatePicker
                    defaultValue={dayjs(date) as PickerValidDate}
                    onChange={(date) => setDate(date)}
                    slotProps={{
                        actionBar: {actions: ['today']}
                    }}
                />
            </div>
        </LocalizationProvider>
    )
}

export default Calendar
