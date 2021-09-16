import * as React from 'react';
import './Signup.scss';
import Logo from '../../images/logo.png'
import { Button, Checkbox, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import { Link } from '@material-ui/core';

interface ISignupProps {
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
    signupButton: {
        padding: '12px',
        marginTop: '24px'
    },
    checkbox: {
        '& .MuiIconButton-label .MuiSvgIcon-root': {
            fill: 'white'
        }
    }
}));
const Signup: React.FunctionComponent<ISignupProps> = (props) => {
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
        <div className="Signup">
            <a href="/">
                <img src={Logo} alt="logo" className="Signup--Logo" />
            </a>
            <div className="Signup__Card">
                <div className="Signup__Card--Header">
                    <h1>Create Your Account</h1>
                    <p>You are just one step away from awesome content.</p>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <ThemeProvider theme={theme}>
                        <div className="Signup__Card--InputName">
                            <TextField
                                label="Enter your Name"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={handleEmailChange}
                                value={email}
                            />
                        </div>
                        <div className="Signup__Card--InputEmail">
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
                        label="I agree to the Terms & Conditions."
                    />
                </form>
                <Button variant="contained" color="primary" className={classes.signupButton}>
                    Create my account
                </Button>
            </div>
            <p>Already have an account? <Link href="/signin" onClick={(e) => { e.stopPropagation() }}>Sign in</Link> </p>
        </div>
    );
};

export default Signup;
