import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import PageLayout from "../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos} from "../redux/ducks/VideoDuck";
import {Field, FormikProvider, useFormik} from "formik";
import {AuthContext} from "../routes/AuthProvider";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";


const SignUpPage: React.FC = (props) => {
    const {  onSignUp} = useContext(AuthContext);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const signUpSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Username too short!')
            .max(255, 'Username too long!')
            .required('Required'),
        name: Yup.string()
            .min(2, 'Name too Short!')
            .max(255, 'Name too long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Password too Short!')
            .max(255, 'Password too long!')
            .required('Required'),
        categoryIds: new Yup.ArraySchema(),
    });

    const setErr = (err:any) => {
        setError(err)
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            password: '',
            id_profile_picture:'user-pfp-bouffon.jpg',
        },
        validationSchema:signUpSchema,
        onSubmit: values => {
            onSignUp && onSignUp(values.username, values.name, values.password,values.id_profile_picture, setErr);
        },
    });

    return (

    <div className={"flex flex-col items-center w-full h-full justify-center bg-gradient-to-r from-primary to-primary/30"}>
        <div className={"w-2/5 bg-white py-10 px-10 drop-shadow-2xl"}>
            <FormikProvider  value={formik}>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className={"flex flex-col space-y-5 w-full flex-grow"}>
                        <div className={"flex flex-col space-y-3 "}>
                            <span className={"font-bold text-2xl"}>Sign Up</span>
                            <span className={"text-secGrey "}>Please enter your details to complete your registration</span>
                        </div>
                        <div className={"flex flex-col space-y-3 "}>
                            <span className={"text-secGrey "}>Name</span>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Enter name"
                                className="form-control inp_text rounded-md h-28 h-10 border border-primary/50 px-3"
                                id="username"
                            />
                        </div>
                        <div className={"flex flex-col space-y-3 "}>
                            <span className={"text-secGrey "}>Username</span>
                            <input
                                type="text"
                                name="username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                placeholder="Enter username"
                                className="form-control inp_text rounded-md h-28 h-10 border border-primary/50 px-3"
                                id="username"
                            />
                        </div>
                        <div className={"flex flex-col space-y-3 "}>
                            <span className={"text-secGrey "}>Password</span>
                            <input
                                type="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Enter password"
                                className="form-control rounded-md h-28 h-10 border border-primary/50 px-3"
                            />
                        </div>
                        <button className={"bg-primary text-white rounded-md h-10"} type="submit">Complete Sign Up</button>
                        <button className={"bg-secWhite text-primary rounded-md h-10"} type="submit"
                                onClick={()=> navigate('/login')}
                        >Sign In</button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    </div>


);
};



export default SignUpPage;