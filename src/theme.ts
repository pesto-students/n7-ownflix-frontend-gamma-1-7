import red from '@material-ui/core/colors/red';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#ffa000',
        },
        secondary: {
            main: '#558b2f',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#000',
        }
    },
});

export default theme;