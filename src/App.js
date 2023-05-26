import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import AppBar from './components/AppBar';
import LoadImagePage from './components/LoadImagePage'
import SelectElementsPage from './components/SelectElementsPage';

import { image2Array , getImageGroups4 } from './utils/image';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);


  const updateImage = (img) => {
    setImage(img);
    const onLoadCallback = (imgArray, dims) => {
      // console.log("Grabbing groups from image array")
      setImageData({
        imageArray: imgArray,
        dims: dims,
        groups: getImageGroups4(imgArray, dims.width)
      });
      // console.log("Done grabbing groups from image array")
    }
    // console.log("Converting Image 2 Array")
    image2Array(img, onLoadCallback);
  }

  let content;
  if (image && imageData) {
    content = 
      <SelectElementsPage
        image={image}
        imageArray={imageData.imageArray}
        dims={imageData.dims}
        groups={imageData.groups}
      />;
  } else {
    content = <LoadImagePage setImage={updateImage}/>;
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
      <Box flexGrow={1} overflow='auto'>
        <Container sx={{height: '100%'}}>
          {content}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
