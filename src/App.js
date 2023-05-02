import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import AppBar from './components/AppBar';
import LoadImagePage from './components/LoadImagePage'
import SelectElementsPage from './components/SelectElementsPage';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  const [image, setImage] = useState(null);

  let content;
  if (image) {
    content = <SelectElementsPage image={image}/>;
  } else {
    content = <LoadImagePage setImage={setImage}/>;
  }

  return (
    <Box
      position="fixed"
      width="100%"
      height="100%"
      top={0}
      left={0}
      display="flex"
      flexDirection="column"
    >
      <AppBar/>
      <Offset />
      <Box flexGrow={1}>
        <Container sx={{height: '100%'}}>
          {content}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
