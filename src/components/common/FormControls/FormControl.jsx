import React from "react";
import TextField from "@material-ui/core/TextField";
import s from "./FormsControl.module.css"

const FormControl = ({input, meta, ...props}) => {
    const hasError = (meta.error && meta.touched && (!meta.active && input.value.length>0))
    return (
        <div className={hasError ? `${s.formControl} ${s.error}` : null}>
            <div>
                {props.children}
            </div>
            <div className={s.span}>
                {hasError &&<span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const CommonTextarea = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <div>
                <TextField style={{margin: '10px'}}  label={input.name}
                           placeholder={restProps.placeholder}
                            {...input} {...restProps}/>
            </div>
        </FormControl>
    )
}