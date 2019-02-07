import React, { Component } from 'react';
import Link from 'next/link';
import UnlikePost from '../posts/UnlikePost';
import LikePost from '../posts/LikePost';
import moment from 'moment'
import BomgSVG from '../svg/bomb';
import { shortenNumber } from '../../utils';
import { showModal } from '../../apollo/clientWrites';


class Posts extends Component {
    render() {
        const { data } = this.props

        return (
            <>
                {data.results.map(({ id, title, author, created_at, last_updated, numLikes, numComments, caption, iLike, tags }) => {
                    const likes = shortenNumber(numLikes)
                    const comments = shortenNumber(numComments)
                    const likesMargin = String(likes.length * .25) + 'rem'
                    const commentsMargin = String(comments.length * .4) + 'rem'
                    const timeMargin = String(comments.length * .25) + 'rem'
                    return (
                        <article key={id} className="media has-text-centered">
                            <figure className="media-left">
                                <p className="image is-48x48">
                                    <img src={author.profile.photo_path || "/static/user_image.png"} />
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <Link href={{ pathname: '/posts', query: { id } }}><a><strong className="font-2">{title} </strong></a></Link>
                                        <br />
                                        {caption}
                                        <br />
                                        <Link href={{ pathname: '/profile', query: { id: author.id } }} >
                                            <a>
                                                {author.isMe ? <strong>You</strong> : <em>{author.username}</em>}
                                            </a>
                                        </Link>
                                        <br />
                                        {tags.map((tag, i) => (
                                            <span key={tag.id} className={`tag font-2 ${i % 2 === 0 ? 'is-primary' : 'is-info'}`}>{tag.tag_name}</span>
                                        ))}
                                        <br />
                                        <small>
                                            <a onClick={() => showModal({ display: 'Likers', message: 'Users who like this', active: true, info: { type: 'post', id } })}>
                                                <span className="icon has-text-primary has-text-weight-bold"><i className="fas fa-heart"></i>{likes} </span>
                                            </a>
                                            <a>
                                                <span className="icon has-text-weight-bold has-text-info"><i className="fas fa-comments"></i> {comments}</span>
                                            </a>
                                            <time>{moment.utc(Number(created_at)).local().format('MMMM Do YYYY')}</time>
                                        </small>
                                    </p>
                                </div>
                            </div>
                            <div className="media-right columns is-multiline is-mobile is-centered">
                                <div className="column is-half has-text-centered">
                                    {iLike ? <UnlikePost size="2x" postId={id} /> : <LikePost size="2x" postId={id} />}
                                </div>
                            </div>

                            <style jsx>{`

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
                {this.props.end ? <article className="media">
                    <figure className="media-left">
                        <div className="image is-64x64">
                            <BomgSVG lit={false} face={{ happy: false }} />
                        </div>
                    </figure>
                    <div className="media-content font-2 has-text-centered">
                        <div className="content has-text-centered">
                            <h3 className="subtitile is-3">
                                No Posts to show...
                        </h3>

                        </div>
                    </div>
                </article> : ''}
            </>
        )
    }
}

export default Posts;
