import { useState , useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

import ElementCard from './ElementCard';

import * as Image from '../utils/image';

const styles = {
  root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
  },
  images_column: {
    width: '50%',
    overflowY: 'auto',
  },
  groups_column: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
  },
};

function SelectElementsPage(props) {
  const { image , imgArray , dims , groups } = props;

  const [ selected , setSelected ] = useState({
    selected: new Array(groups.length).fill(true),
    groupArray: Image.copyImageArray(imgArray),
  });

  const updateSelected = useCallback((groupIndx, isSelected) => {
    setSelected((prevSelected) => {
      if (isSelected === prevSelected.selected[groupIndx]) return prevSelected;
      let nextSelected = {...prevSelected};
      nextSelected.selected[groupIndx] = isSelected;
      const group = groups[groupIndx];
      if (isSelected) {
        Image.setGroupInImage4(group, nextSelected.groupArray, imgArray);
      } else {
        Image.setGroupColorInImage4(nextSelected.groupArray, group);
      }
      return nextSelected;
    });
  }, [imgArray, groups]);

  let groupSelectors = groups.map((group, i) => (
    <ElementCard
      key={i}
      id={i}
      selected={selected.selected[i]}
      baseArray={imgArray}
      baseDims={dims}
      elementGroup={group}
      updateSelected={updateSelected}
    /> 
  ));

  return (
    <Box className={'Select-Elements-Page'} sx={styles.root}>
      <Box className={'Image-Column'} sx={styles.images_column}>
        <Card>
          <CardHeader title='Original Image'/>
          <CardMedia
            component="img"
            image={image}
            alt="original"
          />
        </Card>
        <Card>
          <CardHeader title='SVGs Image'/>
          <CardMedia
            component="img"
            image={Image.array2Image(selected.groupArray, dims.width, dims.height)}
            alt="svgs"
          />
        </Card>
      </Box>
      <Box className={'Groups-Column'} sx={styles.groups_column}>
        {groupSelectors}
      </Box>
    </Box>
  );
}

export default SelectElementsPage;
