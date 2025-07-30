import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export function useDateTime() {
    const [time, setTime] = useState(() => dayjs().tz("Asia/Jakarta"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().tz("Asia/Jakarta"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return time;
}
