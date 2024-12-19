import './Calendar.css';
import {LocalizationProvider, MobileDatePicker, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {IconButton} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Calendar({date, setDate}) {

    function setPreviousDay(): void {
        const previousDay = dayjs(date).subtract(1, 'day')
        setDate(previousDay)
    }

    function setNextDay(): void {
        const nextDay = dayjs(date).add(1, 'day')
        setDate(nextDay)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as PickerValidDate}>
            <div className="calendar">
                <IconButton className="calendar-icon calendar-icon-back" aria-label="previous day" onClick={setPreviousDay}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <MobileDatePicker
                    closeOnSelect
                    defaultValue={dayjs(date) as PickerValidDate}
                    value={date}
                    onChange={(date) => setDate(date)}
                    format="DD MMM YYYY dddd"
                    sx={{
                        width: '100%',
                        "& .MuiInputBase-input": {
                            textAlign: "center"
                        }
                    }}
                    slotProps={{
                        actionBar: {
                            actions: ['cancel', 'today'],
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                            }
                        }
                    }}
                />
                <IconButton className="calendar-icon calendar-icon-forward" aria-label="next day" onClick={setNextDay}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </LocalizationProvider>
    )
}

export default Calendar
