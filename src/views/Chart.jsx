import { useEffect, useState, useRef } from 'react';
import { getGraphData } from '../Services/chartObject';
import { OrganizationChart } from 'primereact/organizationchart';

export default function Chart(props) {
    const { firstName } = props;
    console.log(firstName);

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
    const [scale, setScale] = useState(1);
    const [isRKeyPressed, setIsRKeyPressed] = useState(false);
    const chartRef = useRef(null);

    const adjustScaleToFit = () => {
        if (chartRef.current) {
            const containerWidth = chartRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            const newScale = windowWidth / containerWidth;
            setScale(newScale);
        }
    };

    useEffect(() => {
        getGraphData()
            .then((result) => {
                setData(result);
                setTimeout(adjustScaleToFit, 0);
            })
            .catch((error) => console.warn(error));
    }, []);

    useEffect(() => {
        const handleResize = () => adjustScaleToFit();
        window.addEventListener('resize', handleResize);

        const handleKeyDown = (e) => {
            if (e.key === 'r' || e.key === 'R') {
                setIsRKeyPressed(true);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'r' || e.key === 'R') {
                setIsRKeyPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleWheel = (e) => {
        e.preventDefault();
        if (!chartRef.current.contains(e.target)) return;

        if (!isRKeyPressed) return;

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale((prevScale) => {
            // Ensure zoom level stays within limits (min 0.2, max 3)
            return Math.max(0.2, Math.min(prevScale + delta, 3));
        });
    };

    const nodeTemplate = (node) => {
        return (
            <div
                className="flex flex-column"
                style={
                    node.data.firstName == firstName
                        ? { backgroundColor: 'indianred', borderRadius: '5%' }
                        : { backgroundColor: 'transparent' }
                }
            >
                <div className="flex flex-column align-items-center">
                    <img
                        style={{
                            borderRadius: '50%',
                            margin: '5px',
                        }}
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
        <div
            className="card"
            onWheel={handleWheel}
            style={{
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <p>
                <b>To zoom in or out hold "R" while moving the mouse wheel</b>
            </p>
            <div
                ref={chartRef}
                style={{
                    overflow: 'auto',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-in-out',
                }}
            >
                <OrganizationChart
                    style={{ width: '100%' }}
                    value={data}
                    selectionMode="multiple"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.data)}
                    nodeTemplate={nodeTemplate}
                />
            </div>
        </div>
    );
}
