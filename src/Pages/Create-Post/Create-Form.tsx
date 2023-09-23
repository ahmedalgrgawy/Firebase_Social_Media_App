import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, dataBase } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

interface creatFormData {
    title: string;
    desc: string;
}

export const CreateForm = () => {

    const [user,] = useAuthState(auth);

    const navigate = useNavigate();


    const schema = yup.object().shape({
        title: yup.string().required('You Must Add A Title'),
        desc: yup.string().required('You Must Add A Description'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<creatFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(dataBase, 'posts')

    const onCreatePost = async (data: any) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        })

        navigate('/');
    }

    return (

        <form onSubmit={handleSubmit(onCreatePost)}>

            <input placeholder='Title..' type="text"{...register('title')} />
            <p style={{ color: 'red' }}>{errors.title?.message}</p>

            <textarea placeholder='Description...' {...register('desc')} />
            <p style={{ color: 'red' }}>{errors.title?.message}</p>

            <input type="submit" value="Submit" className="submitForm" />

        </form>
    )

}