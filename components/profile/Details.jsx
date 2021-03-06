import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Follow from '../global/Follow'
import Unfollow from '../global/UnFollow';
import Loading from '../meta/Loading';
import ErrorIcon from '../meta/ErrorIcon';
import { USER_PROFILE } from '../../apollo/queries';

class Details extends Component {

    render() {
        const { userId } = this.props
        return (
            <nav className="level is-mobile">
                <Query query={USER_PROFILE} variables={{ id: userId }} ssr={false}>
                    {({ loading, error, data }) => {
                        if (loading) return (
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Loading</p>
                                    <p className="title"><Loading /></p>
                                </div>
                            </div>
                        )
                        if (error) return (
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Loading</p>
                                    <p className="title"><ErrorIcon /></p>
                                </div>
                            </div>
                        );
                        const { followingMe, imFollowing, username, numFollowers, numFollowing } = data.user
                        const isMe = data.user.isMe || this.props.isMe
                        return (<>

                            {isMe ? '' : <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">{imFollowing ? 'Unfollow' : 'Follow'}</p>
                                    <div className="title">{imFollowing ?
                                        <Unfollow userId={userId} size="small" page="profile" /> :
                                        <Follow userId={userId} size="small" page="profile" />}</div>
                                </div>
                            </div>}
                            {followingMe ? <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">You</p>
                                    <div className="title"><span className="icon"><i className="fas fa-lg fa-user-check has-text-success"></i></span></div>
                                </div>
                            </div> : ''}
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Followers</p>
                                    <p className="title">{numFollowers}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Following</p>
                                    <p className="title">{numFollowing}</p>
                                </div>
                            </div>
                        </>
                        )
                    }}
                </Query>
            </nav>
        );
    }
}

export default Details;
