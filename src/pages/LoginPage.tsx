import * as React from 'react';
import {useContext, useEffect} from 'react';
import PageLayout from "../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos} from "../redux/ducks/VideoDuck";
import {Field, FormikProvider, useFormik} from "formik";
import {AuthContext} from "../routes/AuthProvider";


const LoginPage: React.FC = (props) => {
    const {  onLogin, onLogout, token  } = useContext(AuthContext);

    const {
        videos,
        isLoading,
        isError,
    } = useSelector((state: any) => state.videos)
    const dispatch = useDispatch();
    const handleFetchVideos = () => {
        dispatch(fetchVideos());
    }
    useEffect(() => {
        handleFetchVideos();
    }, [])

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
        <PageLayout>
            <FormikProvider  value={formik}>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <span>Login</span>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder="Enter username"
                        className="form-control inp_text"
                        id="username"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter password"
                        className="form-control"
                    />
                    <button type="submit">Login</button>
                </form>
            </FormikProvider>



        </PageLayout>

    );
};



export default LoginPage;