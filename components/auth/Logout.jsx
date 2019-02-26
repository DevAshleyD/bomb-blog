import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import User from './User';
import { LOGOUT } from '../../apollo/mutations';
import { setNumNotifications } from '../../apollo/clientWrites';


class Logout extends Component {
    render() {
        return (
            <Mutation mutation={LOGOUT} refetchQueries={[`Authenticated`, `User`, `UserProfile`, `Post`, `Comments`, `UserPhoto`, `UserPosts`, `UserLikes`, `Followers`, `Following`, `CurrentUser`, `Notifications`, `IsAdmin`]}>
                {(logout, { loading, error, data, client }) => {
                    if (loading) return null
                    if (!data) return (
                        <>
                            <div className="navbar-item has-text-centered">
                                <User deactivateMenu={this.props.deactivateMenu} />
                            </div>
                            <div className="navbar-item has-text-centered">
                                <button className="button is-dark font-1" onClick={() => { logout(); setNumNotifications(0) }}>Logout</button>
                            </div>
                        </>
                    )
                    return <p>{data.logout ? 'LOGGED OUT' : 'NOT LOGGED OUT'}</p>
                }}
            </Mutation>
        );
    }
}

export default Logout;
