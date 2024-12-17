import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as MySVG } from '../assets/svg/icons8-search.svg';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

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
                <ul>
                    <Button variant="outline-info">
                        <Link style={myStyle} to="/" className={`nav-link`}>
                            Employees
                        </Link>
                    </Button>
                    <Button variant="outline-warning">
                        <Link to="/chart" style={myStyle} className={`nav-link`}>
                            Structure
                        </Link>
                    </Button>
                </ul>

                <Form onSubmit={handleSubmit}>
                    <InputGroup style={{ width: '260px', height: '51px ' }}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Search employees by name..."
                            style={{ fontSize: '12px', marginBottom: '0px' }}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Enter search term"
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
            </div>
            <Outlet />
        </div>
    );
}
