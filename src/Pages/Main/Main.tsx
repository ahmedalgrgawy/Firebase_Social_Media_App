
import { getDocs, collection } from 'firebase/firestore'
import { dataBase } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface PostType {
    id: string;
    userId: string;
    title: string;
    username: string;
    desc: string;
}

export const Main = () => {

    const [postsList, setPostsList] = useState<PostType[] | null>(null);

    const postsRef = collection(dataBase, 'posts');

    const getPosts = async () => {

        const data = await getDocs(postsRef);

        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostType[]
        );

    };

    useEffect(() => {

        getPosts();

    }, [])


    return (
        <div>
            {postsList?.map((post) => (
                <Post post={post} />
            ))}
        </div>
    );
};