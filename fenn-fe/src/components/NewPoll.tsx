import { Box, Button, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { useFormik } from 'formik';
import React from 'react';

interface IPollFormValues {
  title: string;
  options: string[];
}

const NewPoll = () => {
  const formik = useFormik<IPollFormValues>({
    initialValues: {
      title: '',
      options: ['', ''],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <h1>Create new poll</h1>
      <Paper square>
        <Box padding="1rem">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <TextField
                label="Poll title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                margin="normal"
              />
              {formik.values.options.map((option, index) => (
                <TextField
                  label={`Option #${index + 1}`}
                  key={index}
                  margin="dense"
                  variant="outlined"
                  value={option}
                  name={`options[${index}]`}
                  onChange={
                    index === formik.values.options.length - 1
                      ? (e) => {
                          if (e.target.value.length > 0) {
                            formik.setFieldValue('options', [
                              ...formik.values.options.slice(0, formik.values.options.length - 1),
                              e.target.value,
                              '',
                            ]);
                          }
                        }
                      : formik.handleChange
                  }
                  InputProps={{
                    endAdornment:
                      index > 1 &&
                      index < formik.values.options.length - 1 &&
                      formik.values.options[index - 1].length > 0 ? (
                        <InputAdornment position="end">
                          <IconButton>
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                  }}
                />
              ))}
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default NewPoll;
