import { AppShell, Burger, Center, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AiFillBank } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout(props: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 150 }} padding="md">
      <AppShell.Header>
        <Stack>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Center>
            <Group mt="xl">
              <ThemeIcon size="xl">
                <AiFillBank />
              </ThemeIcon>{' '}
              <Title size="xl">ABC Bank</Title>
            </Group>
          </Center>
          <Group justify="flex-end" px="xl">
            <Link to="/">
              <Text>Home</Text>
            </Link>
            <Link to="/login">
              <Text>Login</Text>
            </Link>
            <Link to="/register">
              <Text>Register</Text>
            </Link>
            <Link to="/login">
              <Text>Logout</Text>
            </Link>
          </Group>
        </Stack>
      </AppShell.Header>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
