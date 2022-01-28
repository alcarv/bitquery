import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function BasicButtons() {
    const navigate = useNavigate();
    
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={() => navigate(`/`)} variant="contained">Voltar</Button>
    </Stack>
  );
}