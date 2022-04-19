import React, {useRef, useState} from 'react';

import FormInput from "./FormInput";
import PanelLeft from "./PanelLeft";

import classes from "./OTPPage.module.css";


const OTPPag = (props) => {

    const [otp,setOtp] = useState('');


    const dataDisplayed = {...props.userData};


    const inputChangeHandler = (event) => {
        event.preventDefault();
        setOtp(event.target.value);
        console.log(otp);
    }

    async function resendCodeHandler() {
        const response = await fetch(`http://www.mohamed-ticketing.xyz/api/users/resend-otp/${dataDisplayed.userId}?sendFor=signup`);
        const data = await response.json();
        console.log(data);
    }

    async function sendOtpHandler (event) {
        console.log(event.target);
        const dataSend = {
            userId: dataDisplayed.userId,
            otp,
        };
        console.log(dataSend);


        const response = await fetch('http://www.mohamed-ticketing.xyz/api/users/otp-registration', {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
        //
        // if (data.status === 'fail'){
        //     if (data.errorCode === 100) {
        //         setPasswordError(data.errors[0])
        //     } else if (data.errorCode === 101){
        //         setEmailError(data.errors[0])
        //     } else if (data.errorCode === 102) {
        //         setUsernameError(data.errors[0]);
        //     }
        // }
        // else if (data.status === 'success') {
        //     console.log(data.data.userId);
        //     console.log(dataSend);
        //     props.onSubmit(data.data.userId,dataSend.name,dataSend.email);
        // }
    }

    return (
        <div className={classes.otp}>
            <h1>Welcome <span className={classes.name}>{dataDisplayed.name}</span> thank you for joining us.</h1>
            <h2>
                A Verification code has been sent to your E-mail <span className={classes.email}>{dataDisplayed.email}
            </span>
            </h2>

            <label>Verification code</label>
            <input type="number" onChange={inputChangeHandler}/>

            <button className={classes.resend} onClick={resendCodeHandler}>Resend</button>
            <button className={classes.btn} onClick={sendOtpHandler}>Send</button>
        </div>
    )

}


export default OTPPag;