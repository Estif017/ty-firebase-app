import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
	const [user] = useAuthState(auth);
	const LogOut = async () => {
		await signOut(auth);
	};
	return (
		<div className='navbar'>
			<div className='links'>
				<Link to='/'> Home </Link>
				<Link to='/login'> Login </Link>
			</div>
			<div className='user'>
				{user && (
					<>
						<p>{user.displayName}</p>
						{user.photoURL ? (
							<img src={user.photoURL} width='20' height='20' alt='profile' />
						) : (
							<h1>{user.displayName && user.displayName[0]}</h1>
						)}
						<button onClick={LogOut}>Log out</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
