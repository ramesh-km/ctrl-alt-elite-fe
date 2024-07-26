import { ComboboxItem, Select } from '@mantine/core';
import { useState } from 'react';

export const mockUsersData = [
  {
    value: '1',
    label: 'Yeswanth',
    primary: true,
  },
  {
    value: '2',
    label: 'Sai',
  },
  {
    value: '3',
    label: 'Ramesh',
  },
  {
    value: '4',
    label: 'Harshith',
  },
  {
    value: '5',
    label: 'Vivek',
  },
];

type SwitchUserProps = {
  value: ComboboxItem | null;
  setValue: (value: ComboboxItem | null) => void;
};

function SwitchUser(props: SwitchUserProps) {
  return (
    <Select
      label="Switch User (Proxy user)"
      data={mockUsersData.map((user) => ({
        value: user.value,
        label: user.primary ? `${user.label} (Primary)` : ` ${user.label} (Delegate access)`,
      }))}
      value={props.value ? props.value.value : null}
      onChange={(_value, option) => props.setValue(option)}
    />
  );
}

export default SwitchUser;
