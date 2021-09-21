import * as React from 'react';
import './Verify.scss'
import Logo from '../../images/logo.png'
import { Button, Checkbox, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import { Link } from '@material-ui/core';
interface IVerifyProps {
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
    verifyButton: {
        padding: '12px',
        marginTop: '24px'
    },
}));
const Verify: React.FunctionComponent<IVerifyProps> = (props) => {
    const classes = useStyles();
    const [otp, setOtp] = React.useState('');

    const handleOtpChange = (event: any) => {
        setOtp(event.target.value);
    };

    return (
        <div className="Verify">
            <a href="/">
                <img src={Logo} alt="logo" className="Verify--Logo" />
            </a>
            <div className="Verify__Card">
                <div className="Verify__Card--Header">
                    <h1>Verify</h1>
                    <p>Enter the code sent to your mail.</p>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <ThemeProvider theme={theme}>
                        <div className="Verify__Card--InputOTP">
                            <TextField
                                label="OTP"
                                variant="filled"
                                id="mui-theme-provider-outlined-input"
                                className={classes.input}
                                onChange={handleOtpChange}
                                value={otp}
                            />
                        </div>
                    </ThemeProvider>
                </form>
                <Button variant="contained" color="primary" className={classes.verifyButton}>
                    Verify
                </Button>
            </div>
            <p>Didn't received OTP? <Link onClick={(e) => { e.stopPropagation() }}>Resend</Link> </p>
        </div>
    );
};

export default Verify;
