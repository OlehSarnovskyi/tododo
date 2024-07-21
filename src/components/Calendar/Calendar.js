import './Calendar.css';
import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

function Calendar({getTodoList}) {
    return (
        <div className="Calendar">
            <StaticDatePicker
                onChange={(date) => getTodoList(dayjs(date).format("DD.MM.YYYY"))}
                slotProps={{
                    actionBar: { actions: ['clear'] },
                }}
            />
        </div>
    )
}

export default Calendar
