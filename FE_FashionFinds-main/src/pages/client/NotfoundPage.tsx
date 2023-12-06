import { Result } from 'antd';
import { Link } from 'react-router-dom';
const NotfoundPage = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/" className='bg-blue-400 text-white hover:bg-blue-100 px-4 py-3'>Back Home</Link>}
            />
        </div>
    )
}

export default NotfoundPage