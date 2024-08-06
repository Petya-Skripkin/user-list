import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '../types';
import { userSchema } from '../validation/validationSchema';
import { TextField, Button, Box, IconButton, Paper } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface UserFormProps {
  user?: User;
  onSubmit?: (data: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors } } = useForm<User>({
    defaultValues: user,
    resolver: yupResolver(userSchema) as any, // Todo: Не знаю как правитьно поставить типы
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills' as never, // Todo: Найти решение лучше
  });

  const handleFormSubmit = (data: User) => {
    if (onSubmit) {
      onSubmit(data);
      navigate('/');
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mb={2}>
          <TextField
            label="Имя"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Фамилия"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <label>Навыки</label>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              <TextField
                {...register(`skills.${index}`)}
                error={!!errors.skills?.[index]}
                helperText={errors.skills?.[index]?.message}
                fullWidth
              />
              <IconButton onClick={() => remove(index)}><RemoveIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={() => append('')} startIcon={<AddIcon />}>Добавить навык</Button>
        </Box>
        <Button type="submit" variant="contained" color="primary">Сохранить</Button>
      </form>
    </Paper>
  );
};

export default UserForm;
