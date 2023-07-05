import { addDoc, collection } from 'firebase/firestore';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

interface IcreatePost {
	title: string;
	description: string;
}

const CreateForm = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const schema = yup.object().shape({
		title: yup.string().required('You must add a title!'),
		description: yup.string().required('You must add a description!'),
	});

	const postRef = collection(db, 'posts');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onCreatePost = async (data: IcreatePost) => {
		await addDoc(postRef, {
			...data,
			userName: user?.displayName,
			userId: user?.uid,
		});
		navigate('/');
	};
	return (
		<form onSubmit={handleSubmit(onCreatePost)}>
			<input type='text' placeholder='Title....' {...register('title')} />
			{errors.title && <p style={{ color: 'red' }}>{errors.title?.message}</p>}
			<textarea placeholder='Description....' {...register('description')} />
			{errors.description && (
				<p style={{ color: 'red' }}>{errors.description?.message}</p>
			)}
			<input type='submit' className='submitForm' />
		</form>
	);
};

export default CreateForm;
