import { useEffect, useState } from 'react';
import { getEmployees } from '../utils/fetch';
import EmployeeDisplay from '../components/EmployeeDisplay';

const Results = ({ searchTerm }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [putEmployee, setPutEmployee] = useState(undefined);
    const [chartMode, setChartMode] = useState(false);
    const [firstName, setFirtsName] = useState(undefined);

    const handleClick = (name) => {
        if (!chartMode) {
            setFirtsName(name);
        }
        setChartMode(!chartMode);
    };

    useEffect(() => {
        try {
            getEmployees('?search=' + searchTerm)
                .then((response) => setSearchResult(response.data))
                .catch(error);
        } catch (error) {}
        setChartMode(false);
    }, [searchTerm]);

    const hideModal = () => {
        setIsLoaded(false);
    };
    const showModal = (employee) => {
        setIsLoaded(true);
        setPutEmployee(employee);
    };

    return (
        <div>
            {searchResult.length == 0 || !searchTerm ? (
                <div style={{ color: 'red', fontSize: '34px', textAlign: 'center' }}>
                    No results. Enter search term.
                </div>
            ) : (
                <EmployeeDisplay
                    employees={searchResult}
                    onResize={() => {}}
                    tableHeight={650}
                    hideModal={hideModal}
                    showModal={showModal}
                    isLoaded={isLoaded}
                    putEmployee={putEmployee}
                    chartButton={true}
                    handleClick={handleClick}
                    firstName={firstName}
                    chartMode={chartMode}
                />
            )}
        </div>
    );
};

export default Results;
