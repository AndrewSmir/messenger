import React from "react";
import TextField from "@material-ui/core/TextField";

const CommonTextField = (props) => {

    console.log(props)
    return (
        <TextField style={{margin: '10px', width:'80%'}} id="outlined-basic" label="Message"
                   variant="outlined"/>
    )
}

export default CommonTextField