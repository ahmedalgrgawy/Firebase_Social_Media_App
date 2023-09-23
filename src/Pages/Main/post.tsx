import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, dataBase } from '../../config/firebase';
import { PostType } from './Main'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
    post: PostType;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {

    const [user] = useAuthState(auth);

    const { post } = props;

    const likesRef = collection(dataBase, 'likes')

    const likesDoc = query(likesRef, where('postId', '==', post.id))

    const [likeS, setLikeS] = useState<Like[] | null>(null)

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikeS(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    const addLike = async (data: any) => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })

            if (user) {
                setLikeS((prev) =>
                    prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }])
            }
        } catch (error) {

        }
    }

    const removeLike = async (data: any) => {
        try {

            const likeToDeleteQuery = query(likesRef, where('postId', '==', post.id), where('userId', '==', user?.uid))

            const likeToDeleteData = await getDocs(likeToDeleteQuery)

            const likeID = likeToDeleteData.docs[0].id;

            const likeToDelete = doc(dataBase, 'likes', likeID)

            await deleteDoc(likeToDelete);

            if (user) {
                setLikeS((prev) => prev && prev.filter((like) => like.likeId !== likeID))
            }
        } catch (error) {

        }
    }

    const likedOrNoT = likeS?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);

    return (

        <div className='post'>

            <div className="title">

                <h1>{post.title}</h1>

            </div>

            <div className="body">

                <p>{post.desc}</p>

            </div>

            <div className="footer">

                <p>@{post.username}</p>

                <button onClick={likedOrNoT ? removeLike : addLike}> {likedOrNoT ? <>&#128078;</> : <>&#128077;</>} </button>

                {likeS?.length && <p>Likes:{likeS?.length}</p>}

            </div>

        </div >

    )
}