import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

function About() {
	return (
		<Card>
			<div className='about'>
				<h1>About this project</h1>
				<p>This is a React app to leave feedback for product or a service</p>
				<p>
					<Link to='/'>Back to Home</Link>
				</p>
			</div>
		</Card>
	);
}

export default About;
