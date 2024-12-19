import './Calendar.css';
import {LocalizationProvider, MobileDatePicker, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function Calendar({date, setDate}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as PickerValidDate}>
            <div className="calendar">
                <MobileDatePicker
                    closeOnSelect
                    defaultValue={dayjs(date) as PickerValidDate}
                    onChange={(date) => setDate(date)}
                    format="DD MMM YYYY dddd"
                    sx={{width: '100%'}}
                    slotProps={{
                        actionBar: {
                            actions: ['cancel', 'today'],
                            style: {
                                display: 'flex',
                                // @ts-ignore
                                'justify-content': 'space-between',
                            }
                        }
                    }}
                />
            </div>
        </LocalizationProvider>
    )
}

export default Calendar
