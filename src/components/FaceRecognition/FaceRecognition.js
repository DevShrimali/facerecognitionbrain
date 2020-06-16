import React from 'react';
import './FaceRocognition.css';


const FaceRocognition = ({ imageUrl, box }) => {
	return (
		<div className='center'>
			<div className='absolute mt2'>
			<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
			<div className='bounding-box' 
			style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
			</div>
			</div>
		</div>
		);
}

export default FaceRocognition;