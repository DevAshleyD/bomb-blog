import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_REPLY } from '../../../../apollo/mutations';
import { REPLIES } from '../../../../apollo/queries';

const update = (id, reply_id) => {
    return (proxy, { data: { updateReply } }) => {
        const data = proxy.readQuery({ query: REPLIES, variables: { id } })
        data.comment.replies.map(reply => reply.id === reply_id ? { ...reply, ...updateReply } : reply)
        proxy.writeQuery({ query: REPLIES, variables: { id }, data })
    }
}

class UpdateReply extends Component {
    state = {
        input: this.props.initial
    }
    onSubmit = updateReply => {
        return async e => {
            e.preventDefault();
            if (this.state.input === this.props.initial || this.state.input.length < 1) {
                return this.props.stopEdit()
            }
            const reply_text = this.state.input
            await updateReply({
                variables: { reply_id: this.props.replyId, reply_text },
                optimisticResponse: {
                    __typename: "Mutation",
                    updateReply: {
                        id: this.props.replyId,
                        comment_id: this.props.commentId,
                        reply_text,
                        last_updated: String(Date.now()),
                        __typename: "Reply"
                    }
                }
            })
            this.props.stopEdit()
        }
    }
    render() {
        return (
            <Mutation mutation={UPDATE_REPLY} update={update(this.props.commentId, this.props.replyId)}>
                {(updateReply, { loading, error }) => {
                    return (<form action="" className="form" onSubmit={!loading && !error ? this.onSubmit(updateReply) : undefined}>
                        <div className="field">
                            <p className="control">
                                <textarea onChange={e => this.setState({ input: e.target.value })} value={this.state.input} className="textarea" rows="2" placeholder="Add a reply..."></textarea>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button type="submit" className={`button is-dark is-outlined ${loading && 'is-loading'}`}>Submit</button>
                            </p>
                        </div>
                    </form>)
                }}
            </Mutation>
        );
    }
}

export default UpdateReply;
