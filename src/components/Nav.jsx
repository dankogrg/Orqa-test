import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as MySVG } from '../assets/svg/icons8-search.svg';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';

const myStyle = {
    display: 'inline',
    padding: '20px',
    margin: '40px',
    color: 'blue',
};

export default function Nav({ input, resetInput, handleinput }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        resetInput();
        if (input.trim() == '') {
            return;
        }

        navigate('/results');
    };

    return (
        <div>
            <div className=" container navbar navbar-expand-lg bg-light border-bottom border-body">
                <ul style={{ display: 'flex' }}>
                    <Button variant="outline-info" style={{ margin: '5px' }}>
                        <Link style={myStyle} to="/" className={`nav-link`}>
                            Customers
                        </Link>
                    </Button>
                    <Button variant="outline-warning" style={{ margin: '5px' }}>
                        <Link to="/chart" style={myStyle} className={`nav-link`}>
                            Hierarchy
                        </Link>
                    </Button>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup style={{ margin: '5px' }}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Search employees by name..."
                                style={{ fontSize: '12px', marginBottom: '0px' }}
                            >
                                <Form.Control
                                    type="search"
                                    style={{ height: '40px' }}
                                    value={input}
                                    onChange={handleinput}
                                />
                            </FloatingLabel>
                            <Button
                                variant="light"
                                type="submit"
                                style={{ height: '40px ', padding: 'px', marginLeft: '0px' }}
                            >
                                <MySVG />
                            </Button>
                        </InputGroup>
                    </Form>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}
