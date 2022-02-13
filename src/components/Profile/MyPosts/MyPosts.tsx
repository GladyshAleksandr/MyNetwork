import React from 'react';
import { PostType } from '../../../types/types';
import s from './MyPosts.module.css';
import Post from './Post/Post';


export type MapPropsType = {
    posts: Array<PostType>
    newPostText: string
}

export type DispatchPropsType = {
    addPost: () => void 
    updateNewPostText: (text: string | undefined) => void

}


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements = props.posts.map( p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

       // let newPostElement = React.createRef();
        let newPostElement = React.useRef<HTMLTextAreaElement>(null);

        let onAddPost = () =>
        {
            props.addPost();
        }

        let onPostChange = () =>
        {
            let text = newPostElement.current?.value;
           props.updateNewPostText(text);                   // error
        }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;