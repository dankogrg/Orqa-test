import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Nav from './components/Nav';
import Chart from './views/Chart';

const App = (): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/chart" element={<Chart />}></Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
