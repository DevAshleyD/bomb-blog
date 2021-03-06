import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import User from './User';
import { LOGOUT, authRefetch } from '../../apollo/mutations';
import { setNumNotifications } from '../../apollo/clientWrites';


class Logout extends Component {
    render() {
        return (
            <Mutation mutation={LOGOUT} refetchQueries={authRefetch}>
                {(logout, { loading, data }) => {
                    if (loading) return null
                    if (!data || !data.logout) return (
                        <>
                            <div className="navbar-item has-text-centered">
                                <User deactivateMenu={this.props.deactivateMenu} />
                            </div>
                            <div className="navbar-item has-text-centered">
                                <button className="button is-dark font-1" onClick={() => { logout(); setNumNotifications(0) }}>Logout</button>
                            </div>
                        </>
                    )
                    return <p></p>
                }}
            </Mutation>
        );
    }
}

export default Logout;
