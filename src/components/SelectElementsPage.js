import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import * as Image from '../utils/image'

const FILL = 0;
const FILL_COLOR = ( FILL , FILL , FILL , FILL);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function SelectElementsPage(props) {
  const { image , imageArray , dims , groups } = props;

  const [ selected , setSelected ] = useState({
    group: -1,
    groupArray: new Uint8ClampedArray(imageArray.length).fill(FILL),
    displayImage: image, 
  });

  const updateSelected = (event) => {
    const group = event.target.getAttribute("group");
    if (group === selected.group) return;
    if (selected.group >= 0) {
      Image.setGroupColorInImage4(selected.groupArray, groups[selected.group], FILL_COLOR);
    }
    if (group < 0) {
      setSelected({
        group: 0,
        groupArray: selected.groupArray,
        displayImage: image,
      });
    } else {
      console.log(groups[group]);
      console.log(groups[group].map((i) => ([imageArray[i],imageArray[i+1],imageArray[i+2],imageArray[i+3]])));
      Image.setGroupInImage4(groups[group], selected.groupArray, imageArray);
      setSelected({
        group: group,
        groupArray: selected.groupArray,
        displayImage: Image.array2Image(selected.groupArray, dims.width, dims.height),
      });
    }
  }

  let groupSelectors = groups.map((g, i) => (
    <Item onClick={updateSelected} key={i} group={i}> 
      {"Group " + (i+1)}
    </Item>
  ));

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
          src={selected.displayImage}
          alt="selected_image"
        />
        <Stack>
          <Item onClick={updateSelected} key={-1}  group={-1}>
            Original Image
          </Item>
          {groupSelectors}
        </Stack>
      </Box>
    </Box>
  );
}

export default SelectElementsPage;
