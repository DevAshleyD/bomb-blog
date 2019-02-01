import React, { Component } from 'react';
import Link from 'next/link'
import moment from 'moment'
import DeleteReply from './DeleteReply';
import UpdateReply from './UpdateReply';
class Reply extends Component {
    state = {
        editing: false
    }
    render() {
        const { id, reply_text, replier, created_at, comment_id, last_updated } = this.props
        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img src={replier.profile.photo_path || '/static/user_image.png'} />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <Link href={{ pathname: '/profile', query: { id: replier.id } }} >
                            <a>
                                {replier.isMe ? <em>You</em> : <strong>{replier.username}</strong>}
                            </a>
                        </Link>
                        <br />
                        {!this.state.editing ? reply_text : <UpdateReply commentId={comment_id} replyId={id} initial={reply_text} stopEdit={() => this.setState({ editing: false })} />}
                        <br />
                        <small>
                            {moment.utc(Number(created_at)).local().fromNow()}
                            {replier.isMe ? <> · <a onClick={() => this.setState({ editing: !this.state.editing })}
                                className={`${this.state.editing ? 'has-text-danger' : ''} has-text-weight-bold`}>
                                {this.state.editing ? 'CANCEL' : 'EDIT'}</a> </> : ''}
                        </small>
                    </div>
                </div>
                {replier.isMe ? <DeleteReply commentId={comment_id} replyId={id} /> : ''}
            </article>
        );
    }
}

export default Reply;
