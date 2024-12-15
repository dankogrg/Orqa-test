import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Nav from './components/Nav';
import Chart from './views/Chart';
import Results from './views/Results';
import { useState } from 'react';

const App = (): JSX.Element => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFound, setIsFound] = useState(false);

    const handleinput = (e: any) => {
        setInput(e.target.value);
    };
    const resetInput = () => {
        setSearchTerm(input);
        setInput('');
    };
    console.log(input);
    return (
        <>
            <Routes>
                <Route path="/" element={<Nav input={input} handleinput={handleinput} resetInput={resetInput} />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/chart" element={<Chart />}></Route>
                    <Route path="/results" element={<Results searchTerm={searchTerm} />}></Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
