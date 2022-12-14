import * as React from 'react';
import {useContext, useEffect} from 'react';
import PageLayout from "../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {Field, FormikProvider, useFormik} from "formik";
import {AuthContext} from "../routes/AuthProvider";
import {useNavigate} from "react-router-dom";


const LoginPage: React.FC = (props) => {
    const {  onLogin, onLogout, token  } = useContext(AuthContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            onLogin && onLogin(values.username, values.password);
        },
    });

    return (
        // <PageLayout>
            <div className={"flex flex-col items-center w-full h-full justify-center bg-gradient-to-r from-primary to-primary/30"}>
                <div className={"w-2/5 bg-white py-10 px-10 drop-shadow-2xl "}>
                    <FormikProvider  value={formik}>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <div className={"flex flex-col space-y-5 w-full flex-grow"}>
                                <div className={"flex flex-col space-y-3 "}>
                                    <span className={"font-bold text-2xl"}>Login</span>
                                    <span className={"text-secGrey "}>Welcome back! Please enter your details</span>
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
                                        className="form-control inp_text rounded-md h-28 h-10 border border-primary/50 px-3 "
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
                                <button className={"bg-primary text-white rounded-md h-10"} type="submit">Sign In</button>
                                <button className={"bg-secWhite text-primary rounded-md h-10"} type="submit"
                                        onClick={()=> navigate('/signup')}
                                >Sign Up</button>
                            </div>
                        </form>
                    </FormikProvider>
                </div>
            </div>
        // </PageLayout>

    );
};



export default LoginPage;