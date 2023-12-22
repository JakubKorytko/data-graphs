import React, { useContext, useEffect, useState } from 'react';
import { Radio } from 'react-loader-spinner';
import { test } from 'utils/api.util';
import style from 'components/Wrappers/Loader.style';
import { NotificationsContext } from 'components/Wrappers/Context';
import DataWrapper from 'components/Wrappers/DataWrapper';
import { ConnectionType } from 'components/Wrappers/Loader.type';

function Loader(props: { children: React.ReactNode }) {
  const [connection, setConnection] = useState<ConnectionType>({ count: 0, result: false });

  const { notify } = useContext(NotificationsContext);

  const checkConnection = () => {
    const count = connection.count + 1;
    const { result } = connection;

    if (!result) notify({ code: 2, message: 'Trying to connect' }, 5);
    test().then((res) => {
      if (res) {
        if (!result) notify({ code: 3, message: 'Connection established' }, 5);
        setConnection({ ...{ count }, result: true });
      } else {
        notify({ code: 0, message: 'No connection' }, 10);
        setConnection({ ...{ count }, result: false });
      }
    });
  };

  useEffect(() => {
    if (connection.count === 0) checkConnection();
    const timeout = setTimeout(checkConnection, 5 * 1000);
    return () => clearTimeout(timeout);
  }, [connection]);

  const { children } = props;

  const loader = (
    <div style={style.div}>
      <Radio
        visible
        height="80"
        width="80"
        ariaLabel="radio-loading"
        colors={['rgb(0 51 255)', 'rgb(0 51 255)', 'rgb(0 51 255)']}
        wrapperClass="radio-wrapper"
      />
    </div>
  );

  return !connection.result ? loader : (
    <DataWrapper connection={connection.result}>
      {children}
    </DataWrapper>
  );
}

export default Loader;
