import { useEffect, useReducer, useState } from "react";
import { NotificationWrapperProps } from "../../types/props";
import Notifications from "../Notifications/Container";
import { NotificationsContext } from "./Context";
import { State } from "../../types/api";

const reducer = (notifications: State[], action: {type: string, object: State}): State[] => {
    switch (action.type) {
        case "add":
            const exists = notifications.some((notification: State) => notification.code === action.object.code);
            if (exists) return notifications;

            return [...notifications, action.object];
        case "remove":
            const filtered = notifications.filter((notification: State) => {
                return notification.code !== action.object.code
            });
            return filtered;
        case "clear":
            return [];
        default:
            return notifications;
    }
}

const NotficationsWrapper = (props: NotificationWrapperProps) => {

    let removeTimeouts: number[] = [];

    const notify = (object: { code: number, message: string }, seconds: number) => {
        if (object.code === 500 || object.code === 200) dispatch({ type: "remove", object: { code: 1 } })
        if (object.code === 200) dispatch({ type: "remove", object: { code: 500 } });

        dispatch({ type: "add", object: object });

        removeTimeouts[object.code] && clearTimeout(removeTimeouts[object.code]);
        removeTimeouts[object.code] = setTimeout(() => { dispatch({ type: "remove", object: object }) }, seconds * 1000);
    }

    const [notifications, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        return () => {
            dispatch({ type: "clear" });
            [1, 200, 500, 409, 1000, 1001].forEach((timeout) => {
                clearTimeout(removeTimeouts[timeout]);
            })
        }
    }, [])

    const contextProxy = {
        notify: notify,
        list: notifications,
        remove: (code: number) => { dispatch({ type: "remove", object: { code: code } }) }
    }

    return (
        <NotificationsContext.Provider value={contextProxy}>
            {props.children}
            <Notifications />
        </NotificationsContext.Provider>
    )


}

export default NotficationsWrapper;