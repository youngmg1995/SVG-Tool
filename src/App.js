import { useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import AppBar from './components/AppBar';
import LoadImagePage from './components/LoadImagePage'
import SelectElementsPage from './components/SelectElementsPage';

import { image2Array , getImageGroups4 } from './utils/image';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const styles = {
  root: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
  },
  content: {
      flex: '1 1 auto',
      overflowY: 'auto',
  }
};

function App() {
  const [imageData, setImageData] = useState(null);


  const updateImage = (img) => {
    if (img && img !== undefined) {
      const onLoadCallback = (imgArray, dims) => {
        setImageData({
          image: img,
          imgArray: imgArray,
          dims: dims,
          groups: getImageGroups4(imgArray, dims.width),
        });
      }
      image2Array(img, onLoadCallback);
    }
  }

  let content;
  if (imageData) {
    content = 
      <SelectElementsPage
        image={imageData.image}
        imgArray={imageData.imgArray}
        dims={imageData.dims}
        groups={imageData.groups}
      />;
  } else {
    content = <LoadImagePage setImage={updateImage}/>;
  }

  return (
    <Box sx={styles.root}>
      <AppBar className='App-Bar'/>
      <Offset className='App-Bar-Offset'/>
      <Box sx={styles.content}>
        {content}
      </Box>
    </Box>

  );
}

export default App;
