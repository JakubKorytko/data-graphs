import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { ApiData, CustomMessage } from 'utils/api.util.type';
import { read } from 'utils/api.util';
import chartColors from 'utils/chartColors.util';
import { DataWrapperProps } from 'components/Wrappers/DataWrapper.type';
import { DataContext, NotificationsContext } from 'components/Wrappers/Context';

function DataWrapper(props: DataWrapperProps) {
  const [data, setData] = useState<ApiData | false>(false);
  const { notify } = useContext(NotificationsContext);

  const { connection, children } = props;

  let isFetching = false;
  const delayedTimeouts: number[] = [];

  const reconnectLoop = (
    error: CustomMessage,
    callback: () => Promise<CustomMessage | ApiData>,
  ) => {
    notify(error, 10);

    if (delayedTimeouts[error.code]) {
      clearTimeout(delayedTimeouts[error.code]);
    }
    delayedTimeouts[error.code] = window.setTimeout(() => {
      notify({ code: 2, message: "Can't fetch the data" }, 5);
      isFetching = false;
      callback();
    }, 10000);
  };

  const fetchData = () => {
    const errorCustomMessage: CustomMessage = { type: 'error', code: 500, message: "Can't fetch the data" };

    if (isFetching) {
      return new Promise<CustomMessage>(
        (resolve) => { resolve(errorCustomMessage); },
      );
    }

    if (!connection) {
      return new Promise<CustomMessage>(
        (resolve) => { resolve(errorCustomMessage); },
      );
    }

    isFetching = true;
    return new Promise<CustomMessage | ApiData>((resolve, reject) => {
      read().then((res) => {
        if (res.type === 'error') {
          reconnectLoop(res as CustomMessage, fetchData);
          reject(res);
        } else {
          const apiResData = res as ApiData;
          setData({ ...apiResData, chartColors: chartColors(apiResData.channels.data.length) });

          notify({ code: 200, message: 'Data fetched from the server' }, 5);

          isFetching = false;

          resolve(res);
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextProxy = useMemo(() => ({
    data,
    fetchData,
    reconnect: (error: CustomMessage) => reconnectLoop(error, fetchData),
  }), [data]);

  return <DataContext.Provider value={contextProxy}>{children}</DataContext.Provider>;
}

export default DataWrapper;
