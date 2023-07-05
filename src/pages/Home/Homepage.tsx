import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import Post from './Post';

export interface IPost {
	id: string;
	userId: string;
	title: string;
	description: string;
	userName: string;
}

const Homepage = () => {
	const [postsList, setPostsList] = useState<IPost[] | null>(null);
	const postRef = collection(db, 'posts');

	const getPost = async () => {
		try {
			const data = await getDocs(postRef);
			setPostsList(
				data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPost();
		// eslint-disable-next-line
	}, []);
	return (
		<div>
			{postsList?.map((post) => (
				<Post post={post} />
			))}
		</div>
	);
};

export default Homepage;
