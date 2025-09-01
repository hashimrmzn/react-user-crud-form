import React from 'react'
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
function ShowUsers({users,handleEdit,handleDelete}) {
  return (
    <>
      {users.length > 0 && (
      
   

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            mt: { xs: 2, md: 0 },
            width: {  md: "30%" },
          }}
        >
          <Typography variant="h6" gutterBottom>
            All Users
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {users.map((user, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography>
                <b>User {index + 1}:</b> {user.fname} {user.lname} ({user.email})
              </Typography>
              <Typography variant="body2">
                Type: {user.userType}, Gender: {user.gender}
              </Typography>
              <Typography variant="body2">{user.userDescription}</Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(user, index)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Paper>
      )}
    
    </>
  )
}

export default ShowUsers