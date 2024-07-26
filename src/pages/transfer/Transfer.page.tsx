import {
  Stack,
  Title,
  TextInput,
  NumberInput,
  Button,
  Text,
  Container,
  Group,
  Alert,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import http from '@/utils/http';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconBan, IconCheck } from '@tabler/icons-react';

const schema = z.object({
  fromAccountNumber: z.string().min(1, 'From Account Number is required'),
  toAccountNumber: z.string().min(1, 'To Account Number is required'),
  amount: z.number().min(1, 'Minimum amount is 1'),
});

type TransferFormValues = z.infer<typeof schema>;

// A transfer amount form that allows user to transfer amount from one account to another account

// type TransferPageProps = {
//   userId: string | null;
// };

function TransferPage() {
  const params = useParams() as {
    accountNumber: string;
  };
  const [searchParams, _] = useSearchParams();

  const userId = searchParams.get('userId');
  console.log({ userId });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromAccountNumber: params.accountNumber,
      toAccountNumber: '',
    },
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: TransferFormValues) => http.post('/api/transfer', data),
    onSuccess: () => {
      // TODO: Show success message
      notifications.show({
        title: (
          <Text fw="bold" c="green">
            Success
          </Text>
        ),
        message: <Text>Transfer is successful</Text>,
        color: 'green',
        autoClose: 3000,
        icon: <IconCheck />,
        __size: 'xl',
      });
      navigate('/');
    },
    onError: (error) => {
      // TODO: Show error message
    },
  });

  const onSubmit = (data: TransferFormValues) => {
    mutation.mutate(data);
  };

  console.log(userId);

  if (userId && Number.parseInt(userId) > 2) {
    return (
      <Container>
        <Stack>
          <Title>Bank transfer</Title>
          <Alert color="red" __size="xl" icon={<IconBan />} mt={80}>
            <Text size="xl">You are not authorized to access this page.</Text>
          </Alert>
        </Stack>
      </Container>
    );
  }

  return (
    <Container mt="xl">
      <Stack>
        <Title order={2} ta="center">
          Transfer Amount
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="xl">
            <TextInput
              label="From Account Number"
              placeholder="Enter From Account Number"
              readOnly
              {...register('fromAccountNumber')}
              error={errors.fromAccountNumber?.message}
            />
            <TextInput
              label="To Account Number"
              placeholder="Enter To Account Number"
              {...register('toAccountNumber')}
              error={errors.toAccountNumber?.message}
            />
            <TextInput
              label="Amount"
              placeholder="Enter Amount"
              {...register('amount', {
                valueAsNumber: true,
              })}
              error={errors.amount?.message}
            />
            <Group justify="flex-end">
              <Button
                type="button"
                disabled={mutation.isPending}
                onClick={() => navigate('/')}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" loading={mutation.isPending}>
                Transfer
              </Button>
            </Group>
          </Stack>

          {mutation.isError && <Text color="red">{mutation.error.message}</Text>}
        </form>
      </Stack>
    </Container>
  );
}

export default TransferPage;
