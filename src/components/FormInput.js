import React, {useRef} from "react";
import classes from "./FormInput.module.css";;

const FormInput = (props) => {



    return (
        <div className={classes.formInput}>
            <label>{props.label}</label>
            <input
                id={props.errkey}
                ref={props.ref}
                onBlur={props.onBlur}
                name={props.name}
                type={props.type}
                required={props.required}
                onChange={props.onchange}
                onFocus={props.onfocus}
            />
            <span className={classes.error}>{props.error}</span>
        </div>
    )
}

export default FormInput;