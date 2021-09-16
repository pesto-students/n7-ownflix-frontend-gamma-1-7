import * as React from 'react';
import './Signin.scss';
import Logo from '../../images/logo.png'
import { Button, Checkbox, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import { Link } from '@material-ui/core';

interface ISigninProps {
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        width: "100%",
        backgroundColor: 'White',
        borderRadius: '5px',
        '& .MuiFilledInput-underline-24:after': {
            borderBottom: '0'
        }
    },
    signInButton: {
        padding: '12px',
        marginTop: '24px'
    },
    checkbox: {
        '& .MuiIconButton-label .MuiSvgIcon-root': {
            fill: 'white'
        }
    }
}));
const Signin: React.FunctionComponent<ISigninProps> = (props) => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };
    const handleRememberMeChange = (event: any) => {
        setRememberMe(event.target.checked);
    };
    return (
        <div className="Signin">
            <a href="/">
                <img src={Logo} alt="logo" className="Signin--Logo" />
            </a>
            <div className="Signin__Card">
                <div className="Signin__Card--Header">
                    <h1>Sign In</h1>
                    <p>Enter your credentials to continue.</p>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <ThemeProvider theme={theme}>
                        <div className="Signin__Card--InputEmail">
                            <TextField
                                label="Enter your Email"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={handleEmailChange}
                                value={email}
                            />
                        </div>
                        <TextField
                            type="password"
                            label="Enter your Password"
                            variant="filled"
                            id="mui-theme-provider-outlined-input"
                            className={classes.input}
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </ThemeProvider>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                name="checkedB"
                                color="primary"
                                className={!rememberMe ? classes.checkbox : ''}
                            />
                        }
                        label="Remember Me"
                    />
                </form>
                <Button variant="contained" color="primary" className={classes.signInButton}>
                    Sign in
                </Button>
            </div>
            <p>Don't have an account? <Link href="/signup" onClick={(e) => { e.stopPropagation() }}>Sign up</Link> </p>
        </div>
    );
};

export default Signin;
