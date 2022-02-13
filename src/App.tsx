import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, HashRouter, Link, NavLink, Route, Switch } from "react-router-dom";
import { UsersPage } from './components/Users/UsersPage';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { initializeApp } from './app-reducer';
import Preloader from './common/preloader/Preloader';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/reduxStore';
import { Layout, Menu, Breadcrumb, Avatar, Image, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/chatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void
}


class App extends Component<MapPropsType & MapDispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();

        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {

        if (!this.props.initialized) return <LoginPage />

        return (
            <Layout>
                <Header />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                /*   defaultOpenKeys={['sub1']} */
                                style={{ height: '100%' }}
                            >

                                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                    <Menu.Item key="1"> <Link to="/profile" >Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2"> <Link to="/dialogs">Messages</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                    <Menu.Item key="5"> <Link to="/developers" >Developers</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                                    <Menu.Item key="9"><Link to='/chat'>Chat</Link></Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <React.Suspense fallback={<Preloader />}>
                                <Switch>
                                    <Route path='/dialogs' render={() => <DialogsContainer />} />
                                    <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                                    <Route path='/developers' render={() => <UsersPage pageTitle={"Samurais"} />} />
                                    <Route path='/login' render={() => <LoginPage />} />
                                    <Route path='/chat' render={() => <ChatPage />} />
                                    <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                                </Switch>
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Sasha</Footer>
            </Layout>
            /* 
                        <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />
                            <div className='app-wrapper-content'>
                                <React.Suspense fallback={<Preloader />}>
                                    <Switch>
                                        <Route path='/dialogs' render={() => <DialogsContainer />} />
                                        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                                        <Route path='/users' render={() => <UsersPage pageTitle={"Samurais"} />} />
                                        <Route path='/login' render={() => <LoginPage />} />
                                        <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                                    </Switch>
                                </React.Suspense>
                            </div>
                        </div> */
        )
    }
}
// можно указать exact path='/login' и тогда будет отображаться  исключительно єтот path а не например вместе с '/login/facebook'. Или эе моэно просто обворачивать компонентой Switch для того же  єффекта


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);

const JSApp: React.FC = () => {
    return <Provider store={store}>
        <HashRouter> 
            <AppContainer />
        </HashRouter>
    </Provider>
}


export default JSApp;