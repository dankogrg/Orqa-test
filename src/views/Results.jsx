import { useEffect, useState } from 'react';
import { getEmployees } from '../utils/fetch';

import EmployeeDisplay from '../components/EmployeeDisplay';

const Results = ({ searchTerm }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [putEmployee, setPutEmployee] = useState(undefined);

    useEffect(() => {
        try {
            getEmployees('?search=' + searchTerm)
                .then((response) => setSearchResult(response.data))
                .catch(error);
        } catch (error) {}
    }, [searchTerm]);

    const hideModal = () => {
        setIsLoaded(false);
    };
    const showModal = (employee) => {
        setIsLoaded(true);
        setPutEmployee(employee);
    };
    console.log('b');

    return (
        <div>
            {searchResult.length == 0 ? (
                <div style={{ color: 'red', fontSize: '34px', textAlign: 'center' }}>No results</div>
            ) : (
                <EmployeeDisplay
                    employees={searchResult}
                    onResize={() => {}}
                    myRef={null}
                    scrollRef={null}
                    tableHeight={650}
                    listLoader={null}
                    hideModal={hideModal}
                    showModal={showModal}
                    isLoaded={isLoaded}
                    putEmployee={putEmployee}
                />
            )}
        </div>
    );
};

export default Results;
