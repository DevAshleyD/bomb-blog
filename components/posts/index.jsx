import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import MarkdownIt from 'markdown-it'
import markdownCenterText from 'markdown-it-center-text'
import moment from 'moment'
import ErrorIcon from '../meta/ErrorIcon';
import Comments from './comments';
import Unfollow from '../global/UnFollow';
import Follow from '../global/Follow';
import Like from '../global/Like';
import DeletePost from './DeletePost';
import FeaturePost from '../admin/FeaturePost';
import { POST_AUTHOR } from '../../apollo/queries';
import { setSearch } from '../../apollo/clientWrites';
import LinkWrap from '../global/LinkWrap';

const md = new MarkdownIt({
    html: false,
}).use(markdownCenterText)

class PostPage extends Component {
    state = {
        comments: this.props.comments
    }
    toggleComments = () => {
        this.setState({
            comments: !this.state.comments
        }, () => {
            if (this.state.comments) {
                document.getElementById('comments').scrollIntoView()
            }
        })
    }
    componentDidMount() {
        if (this.state.comments) {
            document.getElementById('comments').scrollIntoView()
        }
    }
    render() {
        if (!this.props.post) return <div>DELETED</div>
        const { id, user_id, author, title, caption, post_content, created_at, last_updated, tags, numComments, image, featured } = this.props.post
        return (
            <div className="main-component">
                <div className="columns is-centered is-mobile is-multiline">
                    <div className="column is-7-desktop is-10-tablet is-full-mobile">
                        <div className="card article">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-center">
                                        <img src={author.profile.photo_path || `/static/user_image.png`} className="author-image" alt={`${author.username}'s picture`} />
                                    </div>
                                    <div className="media-content has-text-centered">
                                        <p className="title is-1 is-size-3-mobile article-title font-1">{title}</p>
                                        <div className="caption content is-size-3">
                                            <div className="columns is-mobile is-centered">
                                                <div className="column is-1 has-text-left is-paddingless"><i className="fas fa-quote-left fa-pull-left"></i></div>
                                                <div className="column is-9 is-size-2 is-size-4-mobile has-text-centered is-paddingless">{caption}</div>
                                                <div className="column is-1 has-text-right is-paddingless"><i className="fas fa-quote-right fa-pull-right"></i></div>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="columns is-mobile is-centered is-multiline">
                                            <div className="column is-2 is-1-mobile"></div>
                                            <div className="column is-2 has-text-centered">
                                                <div >
                                                    <Like postId={id} size="3x" scale={1.5} />
                                                </div>
                                            </div>
                                            <div className="column is-1"></div>
                                            <div className="post-stats column is-6-mobile is-5-tablet has-text-centered">
                                                <div className="subtitle is-6 article-subtitle has-text-centered">
                                                    <Query query={POST_AUTHOR} variables={{ id: user_id }} ssr={false}>
                                                        {({ loading, error, data }) => {
                                                            if (loading) return null
                                                            if (error) return <ErrorIcon size="3x" color="info" />
                                                            const postAuthor = data.user
                                                            return (<>

                                                                {postAuthor.isMe ?
                                                                    <>
                                                                        <div className="columns is-centered is-mobile is-marginless">
                                                                            <div className="column is-3">
                                                                                <DeletePost userId={user_id} id={id} />
                                                                            </div>
                                                                            <div className="column is-1 is-hidden-desktop"></div>
                                                                            <div className="column is-3">
                                                                                <Link href={{ pathname: '/posts/edit', query: { id } }}>
                                                                                    <button className="button is-success">
                                                                                        <span className="icon"><i className="fas fa-pen"></i></span>
                                                                                    </button>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </> :
                                                                    <LinkWrap profile={postAuthor}><a>@{postAuthor.username}</a></LinkWrap>}
                                                                <FeaturePost id={id} featured={featured} />
                                                                <br />
                                                                at {moment.utc(Number(created_at)).local().format(' h:mma on MMMM Do, YYYY')}
                                                                <br />
                                                                {last_updated && <span>
                                                                    <i className="fas fa-pen-square"></i>
                                                                    {moment.utc(Number(last_updated)).local().format(' h:mma on \n MMMM Do, YYYY')}
                                                                </span>}
                                                                <br />
                                                                {!postAuthor.isMe ? postAuthor.imFollowing ? <Unfollow userId={user_id} /> : <Follow userId={user_id} /> : ''}
                                                            </>
                                                            )
                                                        }}
                                                    </Query>
                                                </div>
                                            </div>
                                            <div className="column is-8-desktop is-8-tablet is-full-mobile">
                                                {<div className="tags">
                                                    {tags.map((tag, i) => {
                                                        return <a onClick={() => setSearch({ addToInput: ` #${tag.tag_name}`, active: true })} key={tag.id}
                                                            className={`tag is-rounded font-1 is-medium ${i % 2 === 1 ? 'is-primary' : 'is-dark'}`}>{tag.tag_name}</a>
                                                    })}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {image ? <figure className="image is-128by128">
                                    <img src={image} alt="image" />
                                </figure> : null}
                                <div className="content article-body markdown-body" dangerouslySetInnerHTML={{ __html: md.render(post_content) }}>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="column is-6-desktop is-8-tablet is-12-mobile">
                        <div id="comments" className="has-text-centered">
                            <a onClick={this.toggleComments} className="has-text-grey">
                                <span className="icon">
                                    <i className="fas fa-comment-dots fa-4x"></i>
                                </span>
                            </a>
                            {this.state.comments ? <Comments id={id} author={author.id} /> : <h1 className="title is-4 ">Comments: {numComments}</h1>}
                        </div>
                    </div>

                </div>

                <style jsx>{`     
                    .author-image {
                        position: absolute;
                        top: -30px;
                        left: 50%;
                        width: 60px;
                        height: 60px;
                        margin-left: -30px;
                        border: 3px solid #ccc;
                        border-radius: 50%;
                        box-shadow: 0px 1px 1px gray
                    }
                    column.is-9.has-text-centered{
                        text-align: justify
                    }
                    .media-center {
                        display: block;
                        margin-bottom: 1rem;
                    }
                    .media-content {
                        margin-top: 3rem;
                        overflow: visible
                    }
                    .article {
                        margin-top: 6rem;
                    }
                    .article-subtitle {
                        color: #909AA0;
                        margin-bottom: 3rem;
                    }
                    .article-body {
                        line-height: 1.4;
                    }
                    .box{
                        margin-top: 5rem
                    }
                    .load-error{
                        margin-top: 40vh
                    }
                    .post-stats{
                        display: flex;
                        align-items: center;
                    }

                `}</style>
            </div>
        );
    }
}

export default PostPage;
