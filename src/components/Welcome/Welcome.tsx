import { Title, Text, Anchor,Stack } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <Stack>
      <Title className={classes.title} ta="center" mt={60}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Ctrl-Alt-Elite's ABC Bank
        </Text>
      </Title>
    </Stack>
  );
}
