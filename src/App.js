import { useState } from 'react';
import { Typography, TextField, Container, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const fdSlash = new RegExp('/', 'gi');
const bkSlash = new RegExp('\\\\', 'gi');
const prefix = 'smb:';

const App = () => {
  const [feedback, setFeedback] = useState('Paste a filepath...');
  const [result, setResult] = useState('');

  const iOS_to_win = (path) => {
    let update = path.trim();
    update = update.replace(prefix, '');
    update = update.replace(fdSlash, '\\');
    setResult(() => update);
    setFeedback(() => 'iOS filepath detected!');
  };

  const win_to_iOS = (path) => {
    let update = path.trim();
    update = 'smb:'.concat(update.replace(bkSlash, '/'));
    setResult(() => update);
    setFeedback(() => 'Windows filepath detected!');
  };

  const handleChange = ({ target }) => {
    const path = target.value;
    if (!path.length) {
      setResult(() => '');
      setFeedback(() => 'Enter a filepath...');
    } else {
      path.includes(prefix) ? iOS_to_win(path) : win_to_iOS(path);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      const checkmark = document.getElementById('checkmark');
      checkmark.classList.add('show');
      await navigator.clipboard.writeText(result);
      setTimeout(() => {
        checkmark.classList.remove('show');
      }, 2500);
    } catch (err) {
      console.error(err);
      alert('Error copying content to clipboard');
    }
  };

  return (
    <Container maxWidth='md'>
      <Stack spacing={3}>
        <Typography variant='h1' sx={{ fontSize: 28 }}>
          Filepath Converter
        </Typography>

        <Typography variant='h2' sx={{ fontSize: 18 }}>
          Convert filepaths between iOS and Windows
        </Typography>

        <Stack sx={{ flexGrow: 1 }}>
          <TextField
            onChange={handleChange}
            label={feedback}
            variant='standard'
            fullWidth
          />
          <Button
            onClick={handleCopy}
            sx={{
              textTransform: 'none',
              height: 30,
              fontWeight: 'bold',
              width: '100%',
              border: '1px solid gray',
              borderRadius: 5,
              marginTop: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <ContentCopyIcon sx={{ position: 'absolute', right: 10 }} />
            <CheckIcon id='checkmark' sx={{ position: 'absolute', right: 6 }} />
            {result}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default App;