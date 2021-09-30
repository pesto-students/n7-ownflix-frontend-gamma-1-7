import * as React from 'react';
import { Helmet } from 'react-helmet';
import './Signin.scss';
import Logo from '../../images/logo.png'
import { Button, Checkbox, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import { Link } from '@material-ui/core';
import { useDispatch, } from 'react-redux';
import { login } from '../../redux/auth/auth.actions'
import axios from '../../utils/axiosInstance';

// import authReducer from '../../redux/auth/authReducer';

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
    // const [rememberMe] = React.useState(false);
    const [errorText, setErrorText] = React.useState("")
    const [loadingText, setLoadingText] = React.useState("Sign In")
    const dispatch = useDispatch();


    // const handleEmailChange = (event: any) => {
    //     setEmail(event.target.value);
    // };
    // const handlePasswordChange = (event: any) => {
    //     setPassword(event.target.value);
    // };
    // const handleRememberMeChange = (event: any) => {
    //     setRememberMe(event.target.checked);
    // };
    const handleLoginForm = (e: any) => {
        e.preventDefault();
        setErrorText("")
        setLoadingText("Please wait")
        if (email === "") {
            setErrorText("Enter email address")
            setLoadingText("Sign In")
            return false
        }
        if (password === "") {
            setErrorText("Enter password")
            setLoadingText("Sign In")
            return false
        }
        axios.post('auth/login/', { email: email, password: password }).then(res => {
            // console.log(res.data.data)
            let user = res.data.data.user;
            localStorage.setItem("accessToken", res.data.data.accessToken)
            localStorage.setItem('name', user.name);
            localStorage.setItem('role', user.role);
            localStorage.setItem('user', user.id);
            dispatch(login())
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let foo = params.get('ref');

            if (user.isVerified) {
                if (foo) {
                    window.location.href = foo
                } else {
                    window.location.href = "/home"
                }
            } else {
                window.location.href = "verify/" + user.id + "?ref=" + foo
            }
            // if verified go to home 
            // if not verified go to verify
            // alert("successful")
            // window.location.href="/home"
            // console.log(localStorage)

        }).catch(err => {
            setErrorText("Wrong email and password ")
            setLoadingText("Sign In")
        }).finally(() => {
            setLoadingText("Sign In")
        })
    }
    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email')
        if(email){
            setEmail(email);
        }
    }, [email])
    return (
        <>
            <Helmet defer={false}>
                <title>{`Sign In- ${process.env.REACT_APP_NAME}`}</title>
            </Helmet>
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
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <TextField
                                type="password"
                                label="Enter your Password"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </ThemeProvider>
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    // onChange={'handleRememberMeChange'}
                                    name="checkedB"
                                    color="primary"
                                    className={!rememberMe ? classes.checkbox : ''}
                                />
                            }
                            label="Remember Me"
                        /> */}
                    </form>
                    {errorText !== "" && (
                        <span style={{ color: '#ff5555' }} className="Signin__Card--ErrorText">{errorText}</span>
                    )}
                    <Button disabled={loadingText === "Sign In" ? false : true} onClick={e => handleLoginForm(e)} variant="contained" color="primary" className={classes.signInButton}>
                        {loadingText}
                    </Button>

                </div>
                <p>Don't have an account? <Link href="/signup" onClick={(e) => { e.stopPropagation() }}>Sign up</Link> </p>
            </div>
        </>
    );
};

export default Signin;
