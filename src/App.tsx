import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
