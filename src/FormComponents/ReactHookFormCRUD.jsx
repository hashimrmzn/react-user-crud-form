// ReactHookFormCRUD.jsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  Paper,
  Divider,
  Stack,
} from "@mui/material";

function ReactHookFormCRUD() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      userType: "",
      gender: "",
      userDescription: "",
    },
    mode: "onChange",
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = data;
      setUsers(updated);
      setEditIndex(null);
    } else {
      setUsers([...users, data]);
    }
    reset();
  };

  const handleEdit = (user, index) => {
    reset(user);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <Container
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          User Registration (CRUD with RHF)
        </Typography>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register("fname", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters allowed",
              },
            })}
            error={!!errors.fname}
            helperText={errors.fname?.message}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth 
            label="Last Name"
            margin="normal"
            {...register("lname", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters allowed",
              },
            })}
            error={!!errors.lname}
            helperText={errors.lname?.message}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Min 8 chars, must contain letters & numbers",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ shrink: true }}
          />


          <Controller
            name="userType"
            control={control}
            rules={{ required: "Select user type" }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="User Type"
                margin="normal"
                {...field}
                error={!!errors.userType}
                helperText={errors.userType?.message}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="">Select user type</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
              </TextField>
            )}
          />

          {/* Gender */}
          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.gender}
          >
            <FormLabel>Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                {...register("gender", { required: "Select gender" })}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                {...register("gender", { required: "Select gender" })}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                {...register("gender", { required: "Select gender" })}
              />
            </RadioGroup>
            {errors.gender && (
              <FormHelperText>{errors.gender.message}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            margin="normal"
            {...register("userDescription", {
              required: "Description is required",
              minLength: { value: 5, message: "Min 5 characters" },
              maxLength: { value: 200, message: "Max 200 characters" },
            })}
            error={!!errors.userDescription}
            helperText={errors.userDescription?.message}
            InputLabelProps={{ shrink: true }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !isValid}
            >
              {editIndex !== null ? "Update User" : "Add User"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => {
                reset();
                setEditIndex(null);
              }}
            >
              Clear
            </Button>
          </Box>
        </form>
      </Paper>

      {/* USER LIST */}
      {users.length > 0 && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            mt: { xs: 2, md: 0 },
            width: { xs: "100%", md: "30%" },
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
                <b>User {index + 1}:</b> {user.fname} {user.lname} (
                {user.email})
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
    </Container>
  );
}

export default ReactHookFormCRUD;
