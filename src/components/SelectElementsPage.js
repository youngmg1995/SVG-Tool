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
      height="100%"
    >
      <Box>
        <Box
          sx={{ m: 2 , minHeight: 256}}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={image} alt="selected_image"/>
        </Box>
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
