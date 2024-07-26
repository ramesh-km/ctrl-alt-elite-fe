import { createTheme, Select } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'green',
  components: {
    Button: {
      defaultProps: {
        size: 'xl',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'xl',
      },
    },
    Text: {
      defaultProps: {
        size: 'xl',
      },
    },
    Select: {
      defaultProps: {
        size: 'xl',
      },
    },
  },
});
