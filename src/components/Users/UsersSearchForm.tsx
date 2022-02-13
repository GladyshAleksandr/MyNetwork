import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/usersReducer";
import { useSelector } from "react-redux";
import { getUsersFilterSelector } from "../../redux/usersSelectors";



const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FriendFormTtype  = "true" | "false" | "null"

type FormType = {
    term: string
    friend: FriendFormTtype
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilterSelector)

    const submit = (values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null
            : values.friend === "true" ? true : false
        }
        
            props.onFilterChanged(filter);
        setSubmitting(false)
    }

    return <div>
        <Formik
        enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormTtype }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})
