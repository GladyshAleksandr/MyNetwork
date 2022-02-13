import { Menu, Row, Col, Avatar, Image, Layout, Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../auth-reducer';
import { getAuthSelector, getCurrentUserLogin } from '../../redux/authSelectors';


export type PropsType = {
}


export const Header: React.FC<PropsType> = (props) => {
    const isAuth = useSelector(getAuthSelector)
    const login = useSelector(getCurrentUserLogin)

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout())
    }

    const { Header } = Layout;

    return <Header className="header">
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="5"> <Link to="/developers" >Developers</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            {isAuth
                ? <> <Col span={1}>
                    <Avatar alt={login || ''} src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32, marginTop: 0, }} />} />
                </Col>
                    <Col span={5}>
                        <Button  onClick={logoutCallback}><Link to={"/login"}>Log out</Link></Button>
                    </Col>
                </>
                :
                <Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>
            }
        </Row>
    </Header >
}


