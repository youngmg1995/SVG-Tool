import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

function LoadImagePage(props) {
  const { setImage } = props;
  
  function handleImageSubmit(event) {
    const imageFile = URL.createObjectURL(event.target.files[0]);
    setImage(imageFile);
}

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Input type='file' onChange={handleImageSubmit}/>
    </Box>
  );
}

export default LoadImagePage;
