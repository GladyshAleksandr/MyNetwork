import { AppStateType } from '../redux/reduxStore';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})


export function withAuthRedirect(WrappedConponent: React.ComponentType) {

    function RedirectComponent(props: any) {
        let { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to={"/login"} />

        return <WrappedConponent {...props} />
    }

    let ConnectedAuthRedirectComponent = connect
        (mapStateToPropsForRedirect, {})(RedirectComponent);


    return ConnectedAuthRedirectComponent;

}