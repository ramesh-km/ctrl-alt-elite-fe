import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Container, Stack, Title, ComboboxItem, Select } from '@mantine/core';
import BankAccounts from '@/components/BankAccounts/BankAccounts';
import { BankAccount } from '@/types';
import { useLoaderData } from 'react-router-dom';
import AppLayout from '@/layouts/App.layout';
import SwitchUser, { mockUsersData } from '@/components/SwitchUser/SwitchUser';
import { useState } from 'react';

export function HomePage() {
  const [value, setValue] = useState<ComboboxItem | null>(mockUsersData[0]);
  console.log(value);
  return (
    <AppLayout>
      <Container>
        <Stack gap={80}>
          <Welcome />
          <SwitchUser value={value} setValue={setValue} />
          <BankAccounts userId={value?.value || null} />
        </Stack>
      </Container>
    </AppLayout>
  );
}
