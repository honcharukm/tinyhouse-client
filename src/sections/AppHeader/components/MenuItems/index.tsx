import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Avatar } from 'antd'
import { Viewer } from '../../../../lib/types'
import { LOG_OUT } from '../../../../lib/graphql/mutation'
import { LogOut as LogOutData } from '../../../../lib/graphql/mutation/LogOut/__generated__/LogOut'
import { useMutation } from '@apollo/client'
import { displayErrorMessage, displaySuccessNotification } from '../../../../lib/utils'

const { Item, SubMenu } = Menu

interface Props {
    viewer: Viewer,
    setViewer: (viewer: Viewer) => void
}

export const MenuItems: React.FC<Props> = ({ viewer, setViewer }) => {
    const [ logOut ] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: (data) => {
            if (data && data.logOut) {
                setViewer(data.logOut)
                sessionStorage.removeItem('token')
                displaySuccessNotification('You\'ve successfully logged out!')
            }
        },
        onError: (data) => {
            displayErrorMessage('Sorry! We weren\'t adle to log you out. Please try again later!')
        }
    })

    const handleLogOut = () => {
        logOut()
    }

    const subMenuLogin = viewer.id ? (
        <SubMenu title={<Avatar src={viewer.avatar} />}>
            <Item key="/user">
                <Link to={`/user/${viewer.id}`}>
                    Profile
                </Link>
            </Item>
            <Item key="/logout">
                <div onClick={handleLogOut}>
                    Log out
                </div>
            </Item>
        </SubMenu>
    ) : (
        <Item>
            <Link to="/login">
                <Button type="primary">Sign in</Button>
            </Link>
        </Item>
    )

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/host">
                <Link to="/host">Host</Link>
            </Item>
            {subMenuLogin}
        </Menu>
    )
}