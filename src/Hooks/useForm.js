import {useState, useEffect} from "react";

const useForm = () => {
    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
        password2:''
    });

    const [errors, setErrors] = useState({});

    const changeHandler = event => {

    }
}