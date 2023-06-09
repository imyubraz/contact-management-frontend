import React, { useState } from 'react'
import Layout from '../../layouts/Layout'
import TextField from '../../components/form/text-field/TextField'
import Button from '../../components/button/Button'
import axios from 'axios'
import Loader from './../../components/loader/Loader';
import Success from './../../components/success/Success';
import Error from './../../components/error/Error';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config/backend'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigateTo = useNavigate();

    const changeHandler = (e) =>{
        // console.log(e);
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]:value})
        // console.log(formData);
    }

    const submitHandler = (e) =>{
        e.preventDefault();

        // posting to backend
        // const baseURL = process.env.REACT_APP_BASE_URL;
        const baseURL = BASE_URL;
        const URL = `${baseURL}/user/login`
        try {
            setIsLoading(true);
            axios.post(URL, formData)
            .then(res => {
                setIsLoading(false);
                console.log(res);
                console.log(res.data.data.token);

                // success case
                setSuccess(true);
                setSuccessMessage(res.data.message);

                setHasError(false);

                // saving token to local storage
                // localStorage.setItem("token", res.data.data.token);

                // saving user data to local storage
                const {username, email, userType, token} = res.data.data;
                // console.log(username, email, token);

                localStorage.setItem("auth", JSON.stringify({
                    username: username,
                    email: email,
                    userType: userType, 
                    token: token
                }))

                // navigating to home (/) on successfull login after 1sec
                setTimeout(()=>navigateTo("/"), 1000);
                
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);

                //error case
                setHasError(true);
                setErrorMessage(err.response.data.message);
                setSuccess(false);
            })
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <Layout>
            <div className="wrapper p-2">
                    <div className="container min-h-[80vh] flex justify-center items-center">
                        {isLoading?
                            (
                                <div className="row">
                                    <Loader />
                                </div>
                            )
                            :
                            (
                                <div className="row flex flex-col gap-8 w-full md:w-1/2">
                                    <div className="row">
                                        <h2 className='text-3xl font-semibold text-center'>Login</h2>
                                    </div>
                                    {
                                        hasError&&
                                        (
                                            <div className="row">
                                                <Error>
                                                    Error : {errorMessage}
                                                </Error>
                                            </div>
                                        )
                                    }
                                    {
                                        success&&
                                        (
                                            <div className="row">
                                                <Success>
                                                    {successMessage}
                                                </Success>
                                            </div>
                                        )
                                    }
                                    <div className="row">
                                        <div className="form-wrapper">
                                            <form action="" onSubmit={(e)=>submitHandler(e)}>
                                                <div className="row flex flex-col gap-4">
                                                    <div className="field">
                                                        <TextField label={`Username`} type={`text`} name={`username`} id={`usernameInput`} placeholder={`Username`} value={formData.username} handleChange={(e)=>changeHandler(e)} required={`required`} />
                                                    </div>
                                                    <div className="field">
                                                        <TextField label={`Password`} type={`password`} name={`password`} id={`passwordInput`} placeholder={`**********`} value={formData.password} handleChange={(e)=>changeHandler(e)} required={`required`} />
                                                    </div>
                                                    <div className="field">
                                                        {/* <Button>Login</Button> */}
                                                        <Button type="submit" className={`bg-purple-600 hover:bg-purple-800`}>Login</Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login