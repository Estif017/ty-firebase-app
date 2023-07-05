import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Home/Homepage';
import LoginPage from './pages/LoginPage';
import CreatePost from './pages/create post/CreatePost';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
