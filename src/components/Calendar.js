import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

function Calendar({getTodoList}) {
    return (
        <StaticDatePicker
            onChange={(date) => getTodoList(dayjs(date).format("DD.MM.YYYY"))}
            slotProps={{
                actionBar: { actions: ['clear'] },
            }}
        />
    )
}

export default Calendar
