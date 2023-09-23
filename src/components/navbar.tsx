import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
export default function Navbar() {

    const [user, loading, error] = useAuthState(auth);

    const userSignOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='navbar'>
            <div className="links">
                <Link to='/'>Home</Link>
                {!user ?
                    (<Link to='/Login'>Log In</Link>)
                    :
                    (<Link to='/createpost'>Create Post</Link>)}
            </div>

            <div className='user'>
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ''} width='30' height='30' alt="" />
                        <button onClick={userSignOut}>Log Out</button>
                    </>
                )}
            </div>
        </div >
    )
}