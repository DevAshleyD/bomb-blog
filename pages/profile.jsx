import React, { Component } from 'react';
import UsersList from '../components/auth/Users';
import Header from '../components/meta/Header';
import ProfilePage from '../components/profile/ProfilePage';
class Profile extends Component {
    static getInitialProps({ query: { id }, req, res }) {
        if (req && !id) {
            res.writeHead(302, { Location: `/` })
            res.end()
            return {}
        }
        return { id }
    }
    render() {
        return (
            <>
                <Header />
                {/* <UsersList variables={{ limit: 100, orderBy: 'created_at', order: true, search: 'a' }} /> */}
                <ProfilePage id={this.props.id} />
            </>
        );
    }
}

export default Profile;