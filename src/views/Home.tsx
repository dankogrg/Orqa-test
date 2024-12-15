import { useEffect, useRef, useState } from 'react';
import { getEmployees } from '../utils/fetch';
import EmployeeDisplay from '../components/EmployeeDisplay';
import { log } from 'node:console';

export default function Home() {
    const tableHeight: any = 650;
    const myRef: any = useRef(null);
    const scrollRef: any = useRef(null);

    const [employees, setEmployees]: any = useState([]);
    const [height, setHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(tableHeight);
    const [index, setIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [putEmployee, setPutEmployee] = useState(undefined);
    const [ascension, setAscension] = useState(false);

    const onResize = () => {
        if (myRef.current) setHeight(myRef.current.clientHeight);
    };

    useEffect(() => {
        try {
            getEmployees('?page=' + 1)
                .then((result) => setEmployees(result.data))
                .catch((error) => console.warn(error));
        } catch (error) {
            console.warn(error);
        }
    }, []);

    const hideModal = () => {
        setIsLoaded(false);
    };
    const showModal = (employee: any) => {
        setIsLoaded(true);
        setPutEmployee(employee);
    };

    const listLoader = () => {
        if (scrollRef.current) setScrollHeight(tableHeight + scrollRef.current.scrollTop);

        if (scrollHeight / (height + 10) > 8 + 10 * index) {
            try {
                getEmployees('?page=' + (index + 2)).then((result) => {
                    setEmployees(employees.concat(result.data));
                });

                setIndex(index + 1);
            } catch (error) {}
        }
    };

    const orderList = () => {
        if (ascension == false) {
            const sortedList = [...employees].sort((a, b) => a.manager_id - b.manager_id);
            setEmployees(sortedList);
        }

        setAscension(!ascension);
    };

    return (
        <>
            <EmployeeDisplay
                employees={employees}
                onResize={() => {}}
                myRef={myRef}
                scrollRef={scrollRef}
                tableHeight={tableHeight}
                listLoader={listLoader}
                hideModal={hideModal}
                showModal={showModal}
                isLoaded={isLoaded}
                putEmployee={putEmployee}
            />
        </>
    );
}
