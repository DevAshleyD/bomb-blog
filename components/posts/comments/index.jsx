import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ErrorIcon from '../../meta/ErrorIcon';
import Comment from './Comment';
import CreateComment from './CreateComment'
import { COMMENTS } from '../../../apollo/queries';
import LoadingMedia from '../../meta/LoadingMedia';
class Comments extends Component {
    render() {
        return (
            <div>
                <Query query={COMMENTS} variables={{ id: this.props.id }}>
                    {({ loading, error, data }) => {
                        if (loading) return <div className="box"><LoadingMedia /></div>
                        if (error) return <ErrorIcon size="5x" color="primary" style="margin-top: 5rem" />
                        return (
                            <>
                                <hr />
                                <div>
                                    {data.post.comments.length < 1 ?
                                        <>
                                            <div className="is-size-5 font-1">Be the first to comment on this post!</div>
                                        </> : ''}
                                    {data.post.comments.map((comment) => <Comment author={this.props.author} key={comment.id} {...comment} />)}
                                </div>
                                <hr />
                                <CreateComment postId={this.props.id} />
                            </>
                        )
                    }}
                </Query>

            </div>
        );
    }
}

export default Comments;
