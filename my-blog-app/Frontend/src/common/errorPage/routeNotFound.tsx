import { Link } from 'react-router';

const RouteNotFound = ()=>{
	return(
		<div className='flex flex-col justify-center items-center pt-20 gap-2'>
			<h1>404</h1>
			<p>Route Not Found</p>
			<Link to="/"><button className='bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg'>Go Back</button></Link>
		</div>
	);
} 

export { RouteNotFound };