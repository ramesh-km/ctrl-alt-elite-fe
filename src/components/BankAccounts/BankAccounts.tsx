import { getBankAccounts } from '@/api';
import { BankAccount } from '@/types';
import { List, Stack, Text, ThemeIcon, Title, rem } from '@mantine/core';

import { Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type BankAccountsProps = {
  userId: string | null;
};

function BankAccounts(props: BankAccountsProps) {
  const query = useQuery({
    queryKey: ['bank-accounts', props.userId],
    queryFn: () => getBankAccounts(props.userId!!),
    enabled: !!props.userId,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <Stack>
      <Title order={2}>Your Bank Accounts</Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Text>Account Number</Text>
            </Table.Th>
            <Table.Th>
              <Text>Account Holder Name</Text>
            </Table.Th>
            <Table.Th>
              <Text>Balance</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {query.data.map((bankAccount: any) => (
            <Table.Tr key={bankAccount.accountNumber}>
              <Table.Td>
                <Link to={`/${bankAccount.accountNumber}/transfer?userId=${props.userId}`}>
                  <Text>{bankAccount.accountNumber}</Text>
                </Link>
              </Table.Td>
              <Table.Td>
                <Text>{bankAccount.accountHolderName}</Text>
              </Table.Td>
              <Table.Td>
                <Text>€ {bankAccount.balance}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}

export default BankAccounts;
