import * as React from "react";
import "./Verify.scss";
import Logo from "../../images/logo.png";
import {
  Button,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import theme from "../../theme";
import { Link } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

interface IVerifyProps {}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  input: {
    width: "100%",
    backgroundColor: "White",
    borderRadius: "5px",
    "& .MuiFilledInput-underline-24:after": {
      borderBottom: "0",
    },
  },
  verifyButton: {
    padding: "12px",
    marginTop: "24px",
  },
}));
const Verify: React.FunctionComponent<IVerifyProps> = (props) => {
  const classes = useStyles();
  const [otp, setOtp] = React.useState("");
  const { id }: any = useParams();
  const [errorText, setErrorText] = React.useState("");
  const [btnText, setBtnText] = React.useState("Verify");
  const [timer] = React.useState(0);

  const handleOTPSubmit = (e: any) => {
    e.preventDefault();
    setErrorText("");
    if (otp === "") {
      setErrorText("Please enter the OTP");
    } else {
      setBtnText("Please wait");
      axios
        .get("users/" + id)
        .then((res) => {
          let user = res.data;
          if (user.otp === otp) {
            toast.success("OTP verification successful.Please sign in");
            let foo = "/signin";
            axios
              .put("users/" + id, { isVerified: true })
              .then((res) => {
                window.location.href = "" + foo + "?email=" + user.email;
              })
              .catch((err) => {
                toast.error("Something went wrong");
              });
          } else {
            setErrorText("Wrong OTP entered. Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setBtnText("Verify");
        });
    }
  };
  // const counter:any=(timer:any)=>{
  //     setInterval(() => {
  //         if (timer === 0) {
  //             return;
  //         }
  //         console.log({timer})
  //         setTimer(timer=>timer-1)
  //     }, 1000);
  //     console.log({timer})
  // }
  const handleResendOTP = () => {
    axios
      .post("users/resend-otp", { id: id })
      .then((res) => {
        // setTimer(10)
        toast.info("OTP has been sent ");
        // counter(timer)
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <Helmet defer={false}>
        <title>{`OTP Verification - ${process.env.REACT_APP_NAME}`}</title>
      </Helmet>
      <div className="Verify">
        <a href="/">
          <img src={Logo} alt="logo" className="Verify--Logo" />
        </a>
        <div className="Verify__Card">
          <div className="Verify__Card--Header">
            <h1>Verify</h1>
            {id !== "" && <p>Enter the code sent to your mail.</p>}
          </div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <ThemeProvider theme={theme}>
              <div className="Verify__Card--InputOTP">
                <TextField
                  label="OTP"
                  variant="filled"
                  id="mui-theme-provider-outlined-input"
                  className={classes.input}
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required={true}
                />
              </div>
            </ThemeProvider>
            {errorText !== "" && (
              <span style={{ color: "#ff5555" }}>{errorText}</span>
            )}
          </form>
          <Button
            disabled={btnText === "Verify" ? false : true}
            variant="contained"
            color="primary"
            className={classes.verifyButton}
            onClick={(e) => handleOTPSubmit(e)}
          >
            Verify
          </Button>
        </div>
        <p>
          Didn't received OTP?{" "}
          <Link
            onClick={handleResendOTP}
            style={{
              display: timer === 0 ? "initial" : "hidden",
              cursor: "pointer",
            }}
          >
            Resend
          </Link>{" "}
        </p>
        {timer !== 0 && <p>{timer}</p>}
      </div>
    </>
  );
};

export default Verify;
