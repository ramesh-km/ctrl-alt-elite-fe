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
import { Link, useNavigate } from 'react-router-dom';

import classes from './Register.module.css';

import { useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import http from '@/utils/http';
import { useMutation } from '@tanstack/react-query';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: Schema) => {
      return http.post('/api/register', data);
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
            Welcome to ABC Bank
          </Title>
          <Title order={3} ta="center" mt="md" mb={50}>
            Register
          </Title>

          <TextInput
            label="Username"
            placeholder="user1"
            size="md"
            {...register('username', {
              required: 'Username is required',
            })}
            error={errors.username?.message}
          />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            mt="md"
            type='email'
            size="md"
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

          <Button fullWidth mt="xl" size="md"
          type='submit'
          >
            Register
          </Button>

          <Text ta="center" mt="md">
            Already have an account?{' '}
            <Anchor<'a'> fw={700}>
              <Link to="/login">Login</Link>
            </Anchor>
          </Text>
        </Paper>
      </div>
    </form>
  );
}

export default RegisterPage;
