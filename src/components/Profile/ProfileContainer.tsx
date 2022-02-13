import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { saveProfile, getUserProfileThunkCreator, savePhoto, updateStatusThunkCreator, getStatusThunkCreator } from '../../redux/profileReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapsPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfileThunkCreator: (id: number) => void
    getStatusThunkCreator: (id: number) => void
    updateStatusThunkCreator: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapsPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {


    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId

        if (!userId) {
            this.props.history.push("/login");
        }

        else {
            this.props.getUserProfileThunkCreator(userId);
            this.props.getStatusThunkCreator(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}
                    isOwner={ +this.props.match.params.userId === this.props.myId }
                    status={this.props.status}
                    updateStatus={this.props.updateStatusThunkCreator}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({

    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.auth.myId
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator,
        savePhoto, saveProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
