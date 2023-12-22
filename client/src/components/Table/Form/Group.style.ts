import React from 'react';

export interface GroupProps {
  name: string,
  value: string,
  handler: React.ChangeEventHandler,
  placeholder: string,
  enabled: boolean
}
