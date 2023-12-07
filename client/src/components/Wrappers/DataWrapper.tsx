import { DataWrapperProps } from "../../types/props";
import { ApiData, CustomError } from "../../types/api";
import { useState, useEffect, useContext } from "react";
import { read,} from "../../utils/api.util";
import chartColors from "../../utils/chartColors.util";
import { DataContext, NotificationsContext } from "./Context";


const DataWrapper = (props: DataWrapperProps) => {

    const [data, setData] = useState<ApiData | false>(false);
    const {notify} = useContext(NotificationsContext);
    
    let isFetching = false;
    let delayedTimeouts: number[] = [];

    const fetchData = () => {
        if (isFetching) return;
        if (!props.connection) return; 

        isFetching = true;
        read().then((res) => {
            if (res.type == 'error') reconnectLoop(res as CustomError)
            else {
                const data = res as ApiData;
                setData({...data, chartColors: chartColors(data.channels.data.length)});
                
                notify({ code: 200, message: "Connection established" }, 5);

                isFetching = false;
            }
        });
    }

    const reconnectLoop = (error: CustomError) => {

        notify(error, 10);

        delayedTimeouts[error.code] && clearTimeout(delayedTimeouts[error.code]);
        delayedTimeouts[error.code] = setTimeout(() => {

            notify({ code: 1, message: "Connection retry" }, 5);
            isFetching = false;
            fetchData()

        }, 10000);
    }

    useEffect(() => {
        fetchData();
    }, []);


    const contextProxy = {
        data: data,
        fetchData: fetchData,
        reconnect: reconnectLoop
    }

    
    return <DataContext.Provider value={contextProxy}>{props.children}</DataContext.Provider>
    
}

export default DataWrapper;