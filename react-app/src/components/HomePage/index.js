import './Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import compilation from '../image/compilation.jpg';

function HomePage() {
    const dispatch = useDispatch();

    return (
        <div className='main-home'>
            <div className='main-img'>
                <img src={compilation} alt='compilation of products' />
            </div>
        </div>
    );
}

export default HomePage;
