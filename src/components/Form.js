import React, {useState} from 'react';
import FormRegister from "./FormRegister";
import PanelLeft from "./PanelLeft";
import OTPPage from './OTPPage';


import classes from "./Form.module.css";


const Form = () => {

    const [registered, setRegistered] = useState(false);
    const [formClass, setFormClass] = useState('main-form ');

    const [userData,setUserData] = useState({
        name: '',
        email: '',
        userId: ''
    });




    const formChangeHandler = (userid, userName, userEmail) => {
        console.log(userid, userName, userEmail);
        setRegistered(true);
        setFormClass('form-otp');
        setUserData({
            name: userName,
            email: userEmail,
            userId: userid
        });
    }


    console.log(userData);

    return(
        <div className={classes[formClass]}>
            {!registered && <PanelLeft/>}
            {
                !registered ?
                    <FormRegister onSubmit={formChangeHandler}/>
                    : <OTPPage userData={userData}/>
            }
        </div>
    )
}

export default Form;