import './Calendar.css';
import {LocalizationProvider, MobileDatePicker, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {IconButton} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useRef} from "react";

function Calendar({date, setDate}) {
    const touchStartX = useRef<number | null>(null);

    function setPreviousDay(): void {
        setDate(dayjs(date).subtract(1, 'day'));
    }

    function setNextDay(): void {
        setDate(dayjs(date).add(1, 'day'));
    }

    function handleTouchStart(e: React.TouchEvent): void {
        touchStartX.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e: React.TouchEvent): void {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
            diff < 0 ? setNextDay() : setPreviousDay();
        }
        touchStartX.current = null;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as PickerValidDate}>
            <div
                className="calendar"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <IconButton aria-label="previous day" onClick={setPreviousDay}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <MobileDatePicker
                    closeOnSelect
                    value={date}
                    onChange={(newDate) => { if (newDate) setDate(newDate); }}
                    format="DD MMM YYYY, ddd"
                    sx={{
                        flex: 1,
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            cursor: "pointer",
                            fontWeight: 500,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
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
                <IconButton aria-label="next day" onClick={setNextDay}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </div>
        </LocalizationProvider>
    )
}

export default Calendar
