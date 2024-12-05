import { Link, Outlet } from 'react-router-dom';

const myStyle = {
    display: 'inline',
    padding: '20px',
    margin: '40px',
    color: 'blue',
};

export default function Nav() {
    return (
        <div>
            <div className=" container navbar navbar-expand-lg bg-light border-bottom border-body">
                <ul>
                    <Link style={myStyle} to="/" className={`nav-link`}>
                        Customers
                    </Link>
                    <Link to="/chart" style={myStyle} className={`nav-link`}>
                        Hierarchy
                    </Link>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}
