import { useEffect, useState } from 'react';
import { getGraphData } from '../Services/chartObject';
import { OrganizationChart } from 'primereact/organizationchart';

const Chart = () => {
    const [selection, setSelection] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            getGraphData()
                .then((result) => setData(result))
                .catch((error) => console.warn(error));
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(data);

    const nodeTemplate = (node) => {
        return (
            <div className="flex flex-column">
                <div className="flex flex-column align-items-center">
                    <img
                        alt={`${node.data.firstName} ${node.data.lastName}`}
                        src={node.data.imageUrl}
                        className="mb-3 w-3rem h-3rem"
                    />
                    <span className="font-bold mb-2">{`${node.firstName} ${node.lastName}`}</span>
                    <span>{node.data.position}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart
                value={data}
                selectionMode="multiple"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                nodeTemplate={nodeTemplate}
            />
        </div>
    );
};

export default Chart;
