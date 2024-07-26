import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Notifications __size="xl" position="top-right" />
      </QueryClientProvider>
    </MantineProvider>
  );
}
