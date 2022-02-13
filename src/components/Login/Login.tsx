import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../auth-reducer';
import { getRememberMeSelector, getCaptchaUrlSelector, getUserIdSelector } from './LoginSelectors';
import { useHistory } from 'react-router-dom';


const LoginPage = () => {

    let rememberMe = useSelector(getRememberMeSelector)
    let captchaUrl = useSelector(getCaptchaUrlSelector)
    let userId = useSelector(getUserIdSelector)



    let dispatch = useDispatch()
    let history = useHistory()

    type FormType = {
        email: string | null
        password: string | null
        captcha: string | null
    }

    let onSubmit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter = {
            email: values.email,
            password: values.password,
            captcha: values.captcha
        }


        dispatch(login(filter.email, filter.password, rememberMe, filter.captcha))
    }

    useEffect(() => {
        let location = history.location
        if (userId !== null && location.pathname === '/login') history.push({ pathname: `profile/` + userId })
    }, [onSubmit])



    return <h1>     <Formik
        initialValues={{ email: '', password: '', captcha: '' }}
        /*   validate={values => {
              const errors = {};
              if (!values.email) {
                  errors.email = 'Required';
              } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                  errors.email = 'Invalid email address';
              }
              return errors;
          }} */
        onSubmit={onSubmit}
    >
        {({ isSubmitting }) => (
            <Form>
                <h5 >email</h5>
                <Field type="email" name="email" />
                <h5 >password</h5>
                <Field type="password" name="password" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>

                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && <Field type="text" name="captcha" />}


            </Form>
        )}
    </Formik>
    </h1>
}


export default LoginPage