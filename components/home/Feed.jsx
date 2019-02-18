import React, { Component } from 'react';
import Link from 'next/link';
import UnlikePost from '../posts/UnlikePost';
import LikePost from '../posts/LikePost';
import moment from 'moment'
import BombSVG from '../svg/bomb';
import { shortenNumber } from '../../utils';
import { renderModal, setSearch } from '../../apollo/clientWrites';

class Feed extends Component {
    render() {
        const { data } = this.props
        return (
            <>
                {data.results.map(({ id, title, author, created_at, last_updated, numLikes, numComments, caption, iLike, tags, image }, i) => {
                    const likes = shortenNumber(numLikes)
                    const comments = shortenNumber(numComments)
                    return (
                        <article key={id} className="media has-text-centered">
                            <div className="media-content">
                                <div className="content">
                                    <div>

                                        <Link href={{ pathname: '/posts', query: { id } }}><a className="has-text-dark"><strong className="font-2">{title} </strong></a></Link>
                                        <br />
                                        {caption}
                                        <br />
                                        <Link href={{ pathname: '/profile', query: { id: author.id } }} >
                                            <a>
                                                {author.isMe ? <strong>You</strong> : <em>{author.username}</em>}
                                            </a>
                                        </Link>

                                        <br />
                                        {tags.slice(0, 8).map((tag, i) => (
                                            <a onClick={() => setSearch({ addToInput: ` #${tag.tag_name}`, active: true })} key={tag.id} className={`tag font-2 ${i % 2 === 0 ? 'is-primary' : 'is-info'}`}>{tag.tag_name}</a>
                                        ))}{
                                            tags.length > 7 ? <span className="tag">...</span> : ''
                                        }
                                        <br />
                                        <nav className="level is-mobile">
                                            <div className="level-left">
                                                <a className="level-item  has-text-primary has-text-weight-bold" onClick={() => renderModal({ display: 'Likers', message: 'Users who like this', active: true, info: { type: 'post', id } })}>
                                                    <span className="icon"><i className="fas fa-bomb"></i> </span>
                                                    {likes}
                                                </a>
                                                <a className="level-item has-text-weight-bold has-text-info">
                                                    <span className="icon "><i className="fas fa-comments"></i> </span>
                                                    {comments}
                                                </a>
                                                <span className="level-item">{moment.utc(Number(created_at)).local().format('MMMM Do YYYY')}</span>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="media-right columns is-mobile">
                                <div className="column is-half">
                                    {iLike ? <UnlikePost size="2x" postId={id} /> : <LikePost size="2x" postId={id} />}
                                </div>

                            </div> */}

                            <div className="media-right">
                                <p className="image is-128x128">
                                    {image && <img src={image} alt="image" />}

                                </p>
                                {iLike ? <UnlikePost size="2x" postId={id} /> : <LikePost size="2x" postId={id} />}
                            </div>

                            <style jsx>{`

                               .media-content{
                                   padding: 1rem
                               }
                               .image-container{
                                   width: 75%;
                               }
                                `}</style>
                        </article>
                    )
                })}
                {this.props.end ? <article className="media">
                    <figure className="media-left">
                        <div className="image is-64x64">
                            <BombSVG lit={false} face={{ happy: false }} />
                        </div>
                    </figure>
                    <div className="media-content font-2 has-text-centered">
                        <div className="content has-text-centered">
                            <h3 className="subtitile is-3">
                                No {data.results.length > 0 ? 'more' : ''} Posts to show...
                        </h3>

                        </div>
                    </div>
                </article> : ''}
            </>
        );
    }
}

export default Feed;

