import { useEffect, useState } from 'react';
import { getGraphData } from '../Services/chartObject';
import { OrganizationChart } from 'primereact/organizationchart';

export default function Chart() {
    const [selection, setSelection] = useState([]);
    const [data, setData] = useState([
        {
            expanded: true,
            className: 'bg-indigo-500 text-white',
            data: {
                firstName: '',
                lastName: '',
            },
            Children: [],
        },
    ]);

    useEffect(() => {
        try {
            getGraphData()
                .then((result) => setData(result))
                .catch((error) => console.warn(error));
        } catch (error) {
            console.warn(error);
        }
    }, []);

    console.log(data);

    const nodeTemplate = (node) => {
        return (
            <div className="flex flex-column">
                <div className="flex flex-column align-items-center">
                    <img
                        style={{ borderRadius: '50%', border: '0px' }}
                        alt={`${node.data.firstName} ${node.data.lastName}`}
                        src={node.data.imageUrl}
                        className="mb-3 w-3rem h-3rem"
                    />
                    <span className="font-bold mb-2">{`${node.data.firstName} ${node.data.lastName} `}</span>
                    <span>{node.data.position}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="card ">
            <OrganizationChart
                value={data}
                selectionMode="multiple"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                nodeTemplate={nodeTemplate}
            />
        </div>
    );
}
