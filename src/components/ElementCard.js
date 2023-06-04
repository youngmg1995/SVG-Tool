import { memo } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';

import { createGroupImage4 } from '../utils/image';

const styles = {
  root: {
      width: 200,
      margin: 1,
  },
};

function ElementCard(props) {
  const { id , baseArray , baseDims , elementGroup , selected, updateSelected } = props;

  return (
    <Card sx={styles.root}>
      <CardHeader
        action={
          <Checkbox
            checked={selected}
            onChange={(event) => updateSelected(id, event.target.checked)}
          />
        }
        title={`element-${id+1}`}
      />
      <AspectRatio objectFit="contain">
        <img
          src={createGroupImage4(
            baseArray,
            baseDims.width,
            baseDims.height,
            elementGroup,
            baseArray.slice(elementGroup[0], elementGroup[0]+4)
          )}
          alt={`element-${id}`}
        />
      </AspectRatio>
    </Card>
  );       
}

export default memo(ElementCard);
