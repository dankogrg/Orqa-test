import { useEffect, useRef, useState } from 'react';
import { getEmployees } from '../utils/fetch';
import EmployeeDisplay from '../components/EmployeeDisplay';

let i = 0;
let currentState: any;
let currentList: any;

export default function Home() {
    const tableHeight: any = 650;
    const myRef: any = useRef(null);
    const scrollRef: any = useRef(null);

    const [employees, setEmployees]: any = useState([]);
    const [height, setHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(tableHeight);
    const [isLoaded, setIsLoaded] = useState(false);
    const [putEmployee, setPutEmployee] = useState(undefined);
    const [ascension, setAscension] = useState('neutral');
    currentList = employees;

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
    const orderList = (state: any, list: any) => {
        if (state == 'neutral') {
            setEmployees(list);
        }
        if (state == 'ascending') {
            const sortedList = [...list].sort((a, b) => a.lastName.localeCompare(b.lastName));
            setEmployees(sortedList);
        }
        if (state == 'descending') {
            const sortedList = [...list].sort((b, a) => a.lastName.localeCompare(b.lastName));
            setEmployees(sortedList);
        }
    };
    const reverseOrder = () => {
        if (ascension == 'neutral' || ascension == 'descending') {
            currentState = 'ascending';
        }
        if (ascension == 'ascending') {
            currentState = 'descending';
        }

        setAscension(currentState);
        return currentState;
    };

    const listLoader = async () => {
        if (scrollRef.current) setScrollHeight(tableHeight + scrollRef.current.scrollTop);

        if (scrollHeight / (height + 10) > 8 + 10 * i) {
            try {
                let temp = await getEmployees('?page=' + (i + 2)).then((result) => result.data);
                currentList = currentList.concat(temp);
                console.log(currentList);
                console.log(temp);
                i++;
            } catch (error) {}
            orderList(currentState, currentList);

            console.log(currentState);
            setEmployees(currentList);
        }
    };

    return (
        <>
            <EmployeeDisplay
                employees={employees}
                onResize={onResize}
                myRef={myRef}
                scrollRef={scrollRef}
                tableHeight={tableHeight}
                listLoader={listLoader}
                hideModal={hideModal}
                showModal={showModal}
                isLoaded={isLoaded}
                putEmployee={putEmployee}
                reverseOrder={reverseOrder}
                orderList={orderList}
            />
        </>
    );
}
