import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Checkbox,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

interface IPollFormValues {
  title: string;
  multiChoice: boolean;
  options: string[];
}

const validateForm = (values: IPollFormValues): FormikErrors<IPollFormValues> => {
  const errors: FormikErrors<IPollFormValues> = {};
  if (values.title.length === 0) errors.title = "Poll title can't be empty";
  const optionErrors: string[] = [];
  values.options.forEach((option, index) => {
    if (option.length === 0 && (index < values.options.length - 1 || values.options.length < 3)) {
      optionErrors.push('Poll option cannot be empty');
    } else {
      optionErrors.push('');
    }
  });
  if (optionErrors.reduce((prev, error) => prev || error.length > 0, false)) errors.options = optionErrors;
  return errors;
};

const NewPoll = () => {
  const history = useHistory();
  const fmk = useFormik<IPollFormValues>({
    initialValues: {
      title: '',
      multiChoice: false,
      options: ['', '', ''],
    },
    onSubmit: (values) => {
      const sanitized: IPollFormValues = {
        ...values,
        options: [...values.options.slice(0, values.options.length - 1)],
      };
      axios
        .post<{ id: number }>('/api/poll', sanitized)
        .then((value) => {
          history.push(`/${value.data.id}`);
        })
        .catch((err) => console.error(err));
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateForm,
  });
  const optionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      fmk.setFieldValue('options', [...fmk.values.options.slice(0, fmk.values.options.length - 1), e.target.value, '']);
    }
  };
  const removeOption = (index: number) => {
    fmk.setFieldValue('options', [...fmk.values.options.slice(0, index), ...fmk.values.options.slice(index + 1)]);
  };
  return (
    <>
      <h1>Create new poll</h1>
      <Paper square>
        <Box padding="1rem">
          <form onSubmit={fmk.handleSubmit} autoComplete="off">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <TextField
                label="Poll title"
                name="title"
                value={fmk.values.title}
                onChange={fmk.handleChange}
                margin="normal"
                error={fmk.errors.title !== undefined && fmk.errors.title.length > 0}
                helperText={fmk.errors.title}
              />
              {fmk.values.options.map((option, index) => (
                <TextField
                  label={index === fmk.values.options.length - 1 ? 'Add new option' : `Option #${index + 1}`}
                  key={index}
                  margin="dense"
                  variant="outlined"
                  value={option}
                  name={`options[${index}]`}
                  onChange={index === fmk.values.options.length - 1 ? optionChangeHandler : fmk.handleChange}
                  error={fmk.errors.options !== undefined && fmk.errors.options[index].length > 0}
                  helperText={fmk.errors.options?.[index]}
                  InputProps={{
                    endAdornment:
                      index > 1 && index < fmk.values.options.length - 1 && fmk.values.options[index - 1].length > 0 ? (
                        <InputAdornment position="end">
                          <IconButton onClick={() => removeOption(index)} value={`${index}`}>
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                  }}
                />
              ))}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fmk.values.multiChoice}
                      onChange={fmk.handleChange}
                      name="multiChoice"
                      color="default"
                    />
                  }
                  label="Allow multiple choices"
                />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default NewPoll;
