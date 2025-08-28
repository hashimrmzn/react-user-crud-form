import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

function ShowDataform({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    onUpdate(editData); 
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 2, p: 1 }} elevation={3}>
      <CardContent>
        {isEditing ? (
          <>
    
            <TextField
              label="Name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              fullWidth
              margin="dense"
            />

   
            <TextField
              label="Email"
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              fullWidth
              margin="dense"
            />

      
            <TextField
              label="Password"
              type="password"
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              fullWidth
              margin="dense"
            />

     
            <TextField
              label="Birthday"
              type="number"
              value={editData.birthday}
              onChange={(e) =>
                setEditData({ ...editData, birthday: e.target.value })
              }
              fullWidth
              margin="dense"
            />

     
            <TextField
              label="Birth Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editData.birthdate}
              onChange={(e) =>
                setEditData({ ...editData, birthdate: e.target.value })
              }
              fullWidth
              margin="dense"
            />


          <FormControl fullWidth margin="dense">
  <InputLabel shrink>Favourite Language</InputLabel>
  <Select
    native
    value={editData.language}
    onChange={(e) =>
      setEditData({ ...editData, language: e.target.value })
    }
    fullWidth
  >
    <option value=""></option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
  </Select>
</FormControl>



        
            <FormControl fullWidth margin="dense">
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={editData.tough}
                onChange={(e) =>
                  setEditData({ ...editData, tough: e.target.value })
                }
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="other" />
              </RadioGroup>
            </FormControl>

           
            <TextField
              label="Message"
              value={editData.message}
              onChange={(e) =>
                setEditData({ ...editData, message: e.target.value })
              }
              fullWidth
              margin="dense"
              multiline
              rows={3}
            />

          
            <Box mt={2}>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
       
            <Typography variant="h6">{data.name}</Typography>
            <Typography>Email: {data.email}</Typography>
            <Typography>Password: {data.password}</Typography>
            <Typography>Birthday: {data.birthday}</Typography>
            <Typography>Birth Date: {data.birthdate}</Typography>
            <Typography>Favourite Language: {data.language}</Typography>
            <Typography>Is React Hard?: {data.tough}</Typography>
            <Typography>Message: {data.message}</Typography>

            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ShowDataform;
