import { useEffect, useState } from 'react';
import Chart from '../views/Chart';
import '../assets/css/style.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

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
}: any) => {
    const [chartMode, setChartMode] = useState(false);
    const [firstName, setFirtsName] = useState(undefined);

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

    const handleClick = (name: any) => {
        if (!chartMode) {
            setFirtsName(name);
        }
        setChartMode(!chartMode);
    };

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
                                    zIndex: '256',
                                    height: '50px',
                                    position: 'sticky',
                                    top: '0',
                                    backgroundColor: 'lightgreen',
                                    boxShadow: '0 2px 2px rgba(0, 0, 0, 1)',
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
                                    <td style={{ textAlign: 'center', maxWidth: '155px' }}>
                                        <span style={{ display: 'block', margin: '7px' }}>{employeeData.position}</span>
                                        <Button
                                            label="Show position"
                                            severity="success"
                                            raised
                                            style={{ margin: '5px', padding: '5px' }}
                                            onClick={() => handleClick(employeeData.firstName)}
                                        />
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <Button label="View" raised onClick={() => showModal(employeeData.about)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog
                        visible={isLoaded}
                        onHide={hideModal}
                        style={{ width: '50vw' }}
                        modal
                        header="Details"
                        footer={<Button label="close" raised onClick={hideModal} />}
                    >
                        {putEmployee}
                    </Dialog>
                </div>
            )}

            {chartMode && (
                <div>
                    <Button label="Back" raised onClick={handleClick} style={{ margin: '7px' }} />

                    <Chart firstName={firstName} />
                </div>
            )}
        </div>
    );
};

export default EmployeeDisplay;
