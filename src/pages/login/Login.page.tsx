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
import classes from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import http from '@/utils/http';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Schema = z.infer<typeof schema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: Schema) => {
      return http.post('/api/login', data);
    },
    onSuccess: (data) => {
      navigate('/');
    },
  });

  const onSubmit = async (data: Schema) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Login to ABC Bank
          </Title>
          <Title order={3} ta="center" mt="md" mb={50}>
            Signin{' '}
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            type="email"
            {...register('email', {
              required: 'Email is required',
            })}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor<'a'> fw={700}>
              <Link to="/register">Register</Link>
            </Anchor>
          </Text>
        </Paper>
      </div>
    </form>
  );
}

export default LoginPage;
