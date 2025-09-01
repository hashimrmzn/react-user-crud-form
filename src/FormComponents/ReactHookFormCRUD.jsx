import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { userSchema } from "./validationSchema";
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
import ShowUsers from "./ShowUsers";

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
      phone: "",
      password: "",
      userType: "",
      gender: "",
      userDescription: "",
    },
    mode: "onChange",
    resolver: yupResolver(userSchema),
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
    className="form-container"
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
              flexDirection: { sm: "row" },
              alignItems: "center",
            }}
          >
            <TextField
              label="phone Number"
              margin="normal"
              type="phone"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, maxWidth: { xs: "100%", sm: "70%" } }}
            >
            </TextField>
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
                  <FormLabel
                  sx={{textAlign:"start"}}
                  >Gender</FormLabel>
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

   <ShowUsers  
   users={users}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   />
    
    </Container>
  );
}

export default ReactHookFormCRUD;
