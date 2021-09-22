import * as React from 'react';
import './Signup.scss';
import Logo from '../../images/logo.png'
import { Button, Checkbox, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import { Link } from '@material-ui/core';
import axios from '../../utils/axiosInstance';

interface ISignupProps {
    name:String
    email:String
    password:String
    mobile:String
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
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cnfPassowrd, setCnfPassowrd] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    // const handleEmailChange = (event: any) => {
    //     setEmail(event.target.value);
    // };
    // const handlePasswordChange = (event: any) => {
    //     setPassword(event.target.value);
    // };
    // const handleRememberMeChange = (event: any) => {
    //     setRememberMe(event.target.checked);
    // };
    const handleUserFormSubmit=(e:any)=>{
        e.preventDefault();
        if(name===""){
            setErrorText("Please enter your name")
            return false
        }
        if(email===""){
            setErrorText("Please enter your email")
            return false
        }
        if(mobile===""){
            setErrorText("Please enter your mobile no")
            return false
        }
        if(password===""){
            setErrorText("Please enter your password")
            return false
        }else{
            if(password.length>=8){
                setErrorText("") 
            }else{
                setErrorText("Password must be 8 characters")
                return false
            }
        }



        if(rememberMe){
            if(password===cnfPassowrd){
                setErrorText("")
                let dto:ISignupProps={
                    name,email,mobile,password
                }
                axios.post('users',dto).then(res=>{
                    if(res.status===201){
                        alert("A OTP has been sent to your email id");
                        // console.log(res.data)
                        window.location.href="/verify/"+res.data._id
                    }else if(res.status===204){
                        alert("This email or mobile no  already registred with us")
                    } else{
                        alert("Something went wrong")
                        // console.log(res)
                    }
                }).catch(err=>{
                    console.log(err)
                    alert("Something went wrong")
                })
            }else{
                setErrorText("Passowrd does not match");
            }
        }else{
            setErrorText("Please accept terms & conditions");
        }
//         console.log({name,
// email,
// password,
// cnfPassowrd,
// mobile,
// rememberMe,
// errorText})
    }
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
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleUserFormSubmit}>
                    <ThemeProvider theme={theme}>
                        <div className="Signup__Card--InputName">
                            <TextField
                                label="Enter your Name"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={e=>setName(e.target.value)}
                                value={name}
                                required={true}
                            />
                        </div>
                        <div className="Signup__Card--InputEmail">
                            <TextField
                                type="email"
                                label="Enter your Email"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                required={true}
                            />
                        </div>
                        
                        <div className="Signup__Card--InputEmail">
                            <TextField   
                                label="Enter your Mobile No"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={e=>setMobile(e.target.value)}
                                value={mobile}
                                required={true}
                            />
                        </div>
<div className="Signup__Card--InputEmail">
                        <TextField
                            type="password"
                            label="Enter your Password"
                            variant="filled"
                            id="mui-theme-provider-outlined-input"
                            className={classes.input}
                            onChange={e=>setPassword(e.target.value)}
                            value={password}
                            required={true}
                        />
                        </div>
                        <div className="Signup__Card--InputEmail">
                        <TextField
                            type="password"
                            label="Confirm your Password"
                            variant="filled"
                            id="mui-theme-provider-outlined-input"
                            className={classes.input}
                            onChange={e=>setCnfPassowrd(e.target.value)}
                            value={cnfPassowrd}
                            required={true}
                        />
                        </div>
                    </ThemeProvider>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={e=>setRememberMe(e.target.checked)}
                                name="checkedB"
                                color="primary"
                                className={!rememberMe ? classes.checkbox : ''}
                                required={true}
                            />
                        }
                        label="I agree to the Terms & Conditions."
                    />
                   
                   <div className="Signup__Card--InputEmail">
                       {errorText!=="" && (
                           <span style={{color:'#ff5555'}}>{errorText}</span>
                       )}
                        <Button style={{minWidth:'100%'}} type="submit" variant="contained" color="primary" className={classes.signupButton}>
                            Create my account
                        </Button>
                   </div>
                </form>
            </div>
            <p>Already have an account? <Link href="/signin" onClick={(e) => { e.stopPropagation() }}>Sign in</Link> </p>
        </div>
    );
};

export default Signup;
