import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  Paper,
  Box,
} from "@mui/material";
import ShowDataform from "./ShowDataform";

function SimpleReactForm() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    tough: "",
    language: "",
    birthday: "",
    birthdate: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, formData]);
    setFormData({
      name: "",
      email: "",
      password: "",
      message: "",
      tough: "",
      language: "",
      birthday: "",
      birthdate: "",
    });
  };

  return (
    <Box sx={{ p: 1, maxWidth: 1240, mx: "auto" }}>
      <Paper sx={{ p: 2 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Add User
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              label="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="number"
              label="Birth Day"
              required
              value={formData.birthday}
              onChange={(e) =>
                setFormData({ ...formData, birthday: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
            />

            <FormControl fullWidth required>
              <Select
                native
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Language...
                </option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={formData.tough}
                onChange={(e) =>
                  setFormData({ ...formData, tough: e.target.value })
                }
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              sx={{ gridColumn: "1 / -1" }}
            />
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              sx={{ px: 6, py: 1.5 }}
            >
              Add User
            </Button>
          </Box>
        </form>
      </Paper>

      <Box
        mt={4}
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {users.map((user, index) => (
          <ShowDataform
            key={index}
            data={user}
            onUpdate={(updatedUser) => {
              const newUsers = [...users];
              newUsers[index] = updatedUser;
              setUsers(newUsers);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SimpleReactForm;
