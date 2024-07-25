import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Register.module.css';

function RegisterPage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to ABC Bank
        </Title>

        <TextInput label="Name" placeholder="John Doe" size="md" />
        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Register
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Anchor<'a'> href="#" fw={700}>
            <Link to="/login">Login</Link>
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default RegisterPage;
