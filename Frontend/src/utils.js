import {toast} from 'react-toastify'

export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position: "top-right"
    } )
}

export const handleError = (msg)=>{
    console.log("Error: ", msg)
    toast.error(msg || "An error occured", {
        position: "top-right"
    } )

}