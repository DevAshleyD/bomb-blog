import React, { Component } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment'
import Loading from '../meta/Loading';
import { USER_POSTS } from '../../apollo/queries';
import Link from 'next/link';
import LikePost from '../posts/LikePost';
import UnlikePost from '../posts/UnlikePost';
import { shortenNumber } from '../../utils';
import { renderModal } from '../../apollo/clientWrites';


class UserPosts extends Component {
    render() {
        return (
            <>
                <h1 className="title is-2 font-1">
                    Posts
                </h1>
                <Query query={USER_POSTS} variables={{ id: this.props.userId }}>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading size="5x" color="primary" />
                        if (error) return <ErrorIcon size="5x" color="primary" />;
                        if (data.user.posts.length < 1) {
                            return (
                                <div>
                                    <span className="icon has-text-primary"><i className="fas fa-5x fa-bomb"></i></span>
                                    <hr />
                                    <h1 className="subtitle font-2 is-4">{data.user.isMe ? 'You have no Posts...' : `${data.user.username} has no Posts...`}</h1>
                                </div>
                            )
                        }
                        const isMe = data.user.isMe || this.props.isMe
                        return (
                            <div className="columns is-centered is-mobile">
                                <div className="column is-full-mobile is-four-fifths-tablet is-8-desktop">
                                    {data.user.posts.map(({ id, title, created_at, last_updated, numLikes, numComments, caption, iLike }) => {
                                        const likes = shortenNumber(numLikes)
                                        const comments = shortenNumber(numComments)
                                        const likesMargin = String(likes.length * .25) + 'rem'
                                        const commentsMargin = String(comments.length * .4) + 'rem'
                                        const timeMargin = String(comments.length * .25) + 'rem'
                                        return (
                                            <article key={id} className="media has-text-centered">
                                                <figure className="media-left">
                                                    <p className="image is-48x48">
                                                        <img src={data.user.profile.photo_path || "/static/user_image.png"} />
                                                    </p>
                                                </figure>
                                                <div className="media-content">
                                                    <div className="content">
                                                        <p>
                                                            <Link href={{ pathname: '/posts', query: { id } }}><a><strong className="font-2">{title} </strong></a></Link>
                                                            <br />
                                                            {caption}
                                                            <br />
                                                            <small>
                                                                <a onClick={() => renderModal({ display: 'Likers', message: 'Users who like this', active: true, info: { type: 'post', id } })}>
                                                                    <span className="icon has-text-primary has-text-weight-bold"><i className="fas fa-heart"></i>{likes} </span>
                                                                </a>
                                                                <a>
                                                                    <span className="icon has-text-weight-bold has-text-info"><i className="fas fa-comments"></i> {comments}</span>
                                                                </a>
                                                                <span>{moment.utc(Number(created_at)).local().format('MMMM Do YYYY')}</span>
                                                            </small>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="media-right columns is-multiline is-mobile is-centered">
                                                    <div className="column is-half has-text-centered">
                                                        {iLike ? <UnlikePost size="2x" postId={id} pageDetails={{ page: "profile", userId: this.props.userId }} /> : <LikePost size="2x" postId={id} pageDetails={{ page: "profile", userId: this.props.userId }} />}
                                                    </div>
                                                    {isMe ? <div className="column is-half has-text-centered edit">
                                                        <Link href={{ pathname: '/posts/edit', query: { id } }}><button className="button is-success"><span className="icon"><i className="fas fa-pen"></i></span></button></Link>
                                                    </div> : ''}

                                                </div>
                                                <style jsx>{`
                                                    .edit{
                                                        margin-top: .7rem;
                                                    }
                                                    small a:nth-of-type(1){
                                                        margin-left: ${likesMargin}
                                                    }
                                                    small a:nth-of-type(2){
                                                        margin-left: ${commentsMargin};
                                                        margin-right: ${timeMargin}
                                                    }
                                                `}</style>
                                            </article>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    }}
                </Query>
            </>
        );
    }
}

export default UserPosts;
