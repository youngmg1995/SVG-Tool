import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function SelectElementsPage(props) {
  const { image } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Box>
        <Box
          component="img"
          margin={2}
          minWidth={256}
          maxWidth="100%"
          height="auto"
          src={image}
          alt="selected_image"
        />
        <Stack>
          <Item>Group 1</Item>
          <Item>Group 2</Item>
          <Item>Group 3</Item>
          <Item>Group 4</Item>
          <Item>Group 1</Item>
          <Item>Group 2</Item>
          <Item>Group 3</Item>
          <Item>Group 4</Item>
          <Item>Group 1</Item>
          <Item>Group 2</Item>
          <Item>Group 3</Item>
          <Item>Group 4</Item>
          <Item>Group 1</Item>
          <Item>Group 2</Item>
          <Item>Group 3</Item>
          <Item>Group 4</Item>
        </Stack>
      </Box>
    </Box>
  );
}

export default SelectElementsPage;
