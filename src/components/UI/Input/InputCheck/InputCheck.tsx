import styles from './InputCheck.module.css'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControlLabel: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            margin: 0,
            marginBottom: '5px'
          },
        },
      },
      MuiTypography: {
          styleOverrides: {
              root: {
                  paddingLeft: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px'
              },
          },
      },
      MuiCheckbox: {
        styleOverrides: {
            root: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px'
            },
        },
      },
    },
});

const InputCheck = (props) => {
    const date = props.timeSlot;
    let start, end; 

    if(date){
        start =  date.start.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        end =  date.end.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    }

    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel control={<Checkbox  value={`${date.start.toISOString()} ${date.end.toISOString()}` } onChange={props.onChange}/>} label={`${start} - ${end}`}/>
        </ThemeProvider>
        

    )
}

export default InputCheck
