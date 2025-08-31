import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Paper,
  Divider,
  Stack,
} from "@mui/material";


const schema = yup.object().shape({
  fname: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed"),

  lname: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Must contain letters & numbers"),

  userType: yup.string().required("Select user type"),

  gender: yup.string().required("Select gender"),

  userDescription: yup
    .string()
    .required("Description is required")
    .min(5, "Min 5 characters")
    .max(200, "Max 200 characters"),
});

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
    resolver: yupResolver(schema),
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
          User Registration (CRUD with RHF + Yup)
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
         
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, 
              gap: 2, 
            }}
          >
         
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              {...register("fname")}
              error={!!errors.fname}
              helperText={errors.fname?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
            />

          
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              {...register("lname")}
              error={!!errors.lname}
              helperText={errors.lname?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2, 
            }}
          >
         
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
            />

       
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, 
              gap: 2,
              alignItems: "center",
            }}
          >

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
                  sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
                >
                  <MenuItem value="">Select user type</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </TextField>
              )}
            />


          
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Select gender" }}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  margin="normal"
                  error={!!errors.gender}
                  sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" } }}
                >
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

          </Box>

      
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            margin="normal"
            {...register("userDescription")}
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
    </Container>
  );
}

export default ReactHookFormCRUD;
