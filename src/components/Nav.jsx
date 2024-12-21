import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as MySVG } from '../assets/svg/icons8-search.svg';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

const myStyle = {
    display: 'inline',
    padding: '10px',
    margin: ' 0 10px',
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

    const handleReload = (e) => {
        e.preventDefault();

        const href = e.currentTarget.getAttribute('href');
        window.location.href = href;
        return (window.location.href = '/');
    };

    return (
        <div>
            <div
                style={{ padding: '26px', margin: '10px auto' }}
                className=" container navbar navbar-expand-lg bg-light border-bottom border-body"
            >
                <ul style={{ display: 'flex' }}>
                    <Button rounded label="Customers" style={myStyle} raised severity="info" onClick={handleReload} />
                    <Button
                        label="Hierarchy"
                        style={myStyle}
                        raised
                        severity="info"
                        onClick={() => (window.location.href = '/chart')}
                    />
                    <form onSubmit={handleSubmit}>
                        <FloatLabel>
                            <InputText type="search" value={input} onChange={handleinput} />
                            <label htmlFor="Enter first or last name...">Enter first or last name</label>
                            <Button raised type="submit" severity="info" style={myStyle} label={<MySVG />}></Button>
                        </FloatLabel>
                    </form>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}
