import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Chart from '../views/Chart';
import '../assets/css/style.css';

const EmployeeDisplay = ({
    employees,
    onResize,
    myRef,
    scrollRef,
    tableHeight,
    listLoader,
    showModal,
    hideModal,
    isLoaded,
    putEmployee,
    chartButton,
    chartMode,
    firstName,
    handleClick,
}: any) => {
    useEffect(() => {
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', listLoader);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', listLoader);
        };
    }),
        [];

    return (
        <div>
            {!chartMode && (
                <div
                    className="table-responsive tableDiv"
                    style={{ height: `${tableHeight}px` }}
                    ref={scrollRef}
                    onScroll={listLoader}
                >
                    <table className="table table-striped" style={{ marginBottom: '0' }}>
                        <thead>
                            <tr
                                style={{
                                    height: '50px',
                                    position: 'sticky',
                                    top: '0',
                                    backgroundColor: 'lightgreen',
                                    border: 'solid 3px',
                                }}
                            >
                                <th>Image</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Position</th>
                                <th>Details</th>
                                <th>Manager ID</th>
                                <th>Created</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((employeeData: any, index: any) => (
                                <tr key={index} id="employeerow" ref={myRef}>
                                    <td>
                                        <img
                                            style={{ minWidth: '130px', maxWidth: '140px' }}
                                            src={employeeData.imageUrl}
                                            alt=""
                                            className="card-img-top img-thumbnail"
                                        />
                                    </td>
                                    <td>{employeeData.firstName}</td>
                                    <td>{employeeData.lastName}</td>
                                    <td>{employeeData.adress}</td>
                                    <td>{employeeData.email}</td>
                                    <td>{employeeData.contactNumber}</td>
                                    <td>
                                        {employeeData.position}
                                        {chartButton == true && (
                                            <Button
                                                variant="success"
                                                style={{ margin: '5px' }}
                                                onClick={() => handleClick(employeeData.firstName)}
                                            >
                                                Show position
                                            </Button>
                                        )}
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <Button variant="primary" onClick={() => showModal(employeeData.about)}>
                                            View
                                        </Button>
                                    </td>
                                    <td>{employeeData.manager_id}</td>
                                    <td>
                                        {new Date(employeeData.created_at).toLocaleDateString() +
                                            ' ' +
                                            new Date(employeeData.created_at).toLocaleTimeString()}
                                    </td>
                                    <td>
                                        {new Date(employeeData.updated_at).toLocaleDateString() +
                                            ' ' +
                                            new Date(employeeData.updated_at).toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal show={isLoaded} onHide={hideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{putEmployee}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={hideModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}

            {chartMode && (
                <div>
                    <Button onClick={handleClick} style={{ margin: '7px' }}>
                        Back
                    </Button>{' '}
                    <Chart firstName={firstName} />
                </div>
            )}
        </div>
    );
};

export default EmployeeDisplay;
