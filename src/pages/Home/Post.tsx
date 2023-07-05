import { useAuthState } from 'react-firebase-hooks/auth';
import { IPost } from './Homepage';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

interface Props {
	post: IPost;
}
interface ILike {
	likeId: string;
	userId: string;
}
const Post = (props: Props) => {
	const { post } = props;
	const [user] = useAuthState(auth);

	const [likes, setLikes] = useState<ILike[] | null>(null);
	const likesRef = collection(db, 'likes');
	const likesDoc = query(likesRef, where('postId', '==', post.id));

	const addLike = async () => {
		try {
			const newDoc = await addDoc(likesRef, {
				userId: user?.uid,
				postId: post.id,
			});
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user.uid, likeId: newDoc.id }]
						: [{ userId: user.uid, likeId: newDoc.id }]
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeLike = async () => {
		try {
			const removeLikeQuery = query(
				likesRef,
				where('postId', '==', post.id),
				where('userId', '==', user?.uid)
			);
			const removeLikeData = await getDocs(removeLikeQuery);
			const likeId = removeLikeData.docs[0].id;
			const unlike = doc(db, 'likes', likeId);
			await deleteDoc(unlike);
			if (user) {
				setLikes(
					(prev) => prev && prev.filter((like) => like.likeId !== likeId)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(
			data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
		);
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

	useEffect(() => {
		getLikes();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className='title'>
				<h1>{post.title}</h1>
			</div>
			<div className='body'>
				<p>{post.description}</p>
			</div>
			<div className='footer'>
				<p>@{post.userName}</p>
				<button onClick={hasUserLiked ? removeLike : addLike}>
					{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p>Likes : {likes?.length}</p>}
			</div>
		</div>
	);
};

export default Post;
