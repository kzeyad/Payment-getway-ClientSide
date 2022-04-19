import React, {useRef, useState} from 'react';
import FormInput from "./FormInput";
import classes from "./Formregister.module.css";
import PanelLeft from "./PanelLeft";

const FormRegister = (props) => {
    const [usernameError,setUsernameError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [passwordTwoError,setPasswordTwoError] = useState('');

    const [userId,setUseId] = useState('');


    const [isValid, setIsValid] = useState('valid');

    const userNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');





    async function submitHandler(event) {
        event.preventDefault();
        const dataSend = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value
        };

        console.log(dataSend);

        if (event.target[3].value !== event.target[2].value) {
            setPasswordTwoError('The password are not the same');
            return;
        } else {
            setPasswordTwoError('');
        }

        const response = await fetch('http://www.mohamed-ticketing.xyz/api/users/signup', {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);

        if (data.status === 'fail'){
            if (data.errorCode === 100) {
                setPasswordError(data.errors[0])
            } else if (data.errorCode === 101){
                setEmailError(data.errors[0])
            } else if (data.errorCode === 102) {
                setUsernameError(data.errors[0]);
            }
        }
        else if (data.status === 'success') {
            console.log(data.data.userId);
            console.log(dataSend);
            props.onSubmit(data.data.userId,dataSend.name,dataSend.email);
        }

    }

    // check password
    async function checkPasswordHandler(password) {
        setPasswordError('');
        const passwordObject = {
            password: password.target.value
        }
        if (password.target.id ==='3'){
        const response = await fetch('http://www.mohamed-ticketing.xyz/api/users/check-password', {
            method: 'POST',
            body: JSON.stringify(passwordObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status === 'fail' && password.target.value !== ''){
            setPasswordError(data.errors[0]);
            console.log(passwordError)
            return false;
        }
        }
    }

    function resetHandler (event) {
        setPasswordTwoError('');
        setPasswordError('');
        setEmailError('');
        setUsernameError('')
    }

    const inputs = [
        {
            id:'1',
            name: 'username',
            type: 'text',
            label: 'Username',
            error: usernameError,
            required: true,
            ref: userNameRef,
            class: isValid
        },
        {
            id:'2',
            name: 'email',
            type: 'email',
            label: 'Email',
            error: emailError,
            required: true,
            ref: emailRef,
            class: isValid

        },
        {
            id:'3',
            name: 'password',
            type: 'password',
            label: 'Password',
            error: passwordError,
            required: true,
            ref: passwordRef,
            class: isValid

        },
        {
            id: '4',
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm password',
            error: passwordTwoError,
            required: true,
            ref: passwordRef,
            class: isValid
        }
    ]

    return(
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <h2>Register now in <span className={classes.hashCash}>Hash Cash</span></h2>
                    {inputs.map((input) => (
                        <FormInput onBlur={checkPasswordHandler} onfocus={resetHandler} ref={input.ref} errkey={input.id} {...input}/>))
                    }
                    <h3>Already have and account! <a className={classes.login}>Login</a> </h3>
                    <button className={classes.btn}>Submit</button>
                </form>
            </div>
    )
}

export default FormRegister;