import { useEffect, useState, useRef } from 'react';
import { getGraphData } from '../Services/chartObject';
import { OrganizationChart } from 'primereact/organizationchart';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Chart(props) {
    const { firstName } = props;

    const [selection, setSelection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scale, setScale] = useState(1);
    const [isRKeyPressed, setIsRKeyPressed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const chartRef = useRef(null);
    const [data, setData] = useState([
        {
            expanded: true,
            data: {
                firstName: '',
                lastName: '',
            },
            Children: [],
        },
    ]);

    const adjustScaleToFit = () => {
        if (chartRef.current) {
            const containerWidth = chartRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            const newScale = windowWidth / containerWidth;
            setScale(newScale);
            chartRef.current.style.height = `${chartRef.current.scrollHeight * newScale}px`;
        }
    };

    useEffect(() => {
        getGraphData()
            .then((result) => {
                setData(result);
                setTimeout(adjustScaleToFit, 0);
                setIsLoaded(true);
            })
            .catch((error) => console.warn(error));
    }, []);

    useEffect(() => {
        const handleResize = () => adjustScaleToFit();

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

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleWheel = (e) => {
        if (!chartRef.current.contains(e.target)) return;

        if (!isRKeyPressed) return;

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale((prevScale) => Math.max(0.2, Math.min(prevScale + delta, 3))); // Set zoom limits
    };

    const startDrag = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const stopDrag = () => {
        setIsDragging(false);
        setStartPosition(null);
    };

    const onDrag = (e) => {
        if (!isDragging || !startPosition) return;

        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;

        setPosition((prevPosition) => {
            const newX = prevPosition.x + deltaX;
            const newY = prevPosition.y + deltaY;

            // Calculate boundaries
            const containerWidth = chartRef.current.scrollWidth * scale;
            const containerHeight = chartRef.current.scrollHeight * scale;
            const frameWidth = window.innerWidth;
            const frameHeight = window.innerHeight;

            // Allow 50% of the component to be dragged outside the frame
            const limitedX = Math.max(-containerWidth * 0.5, Math.min(newX, frameWidth * 0.5));
            const limitedY = Math.max(-containerHeight * 0.5, Math.min(newY, frameHeight * 0.5));

            return { x: limitedX, y: limitedY };
        });

        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const nodeTemplate = (node) => {
        return (
            <div
                className="flex flex-column"
                style={{
                    ...(node.data.firstName === firstName && { backgroundColor: 'indianred', borderRadius: '5%' }),
                }}
            >
                <div className="flex flex-column align-items-center" style={{ padding: '5px' }}>
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
        <div>
            <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'lightblue', margin: '0 5px' }}>
                <p>
                    <b>
                        To zoom in or out hold "R" while moving the mouse wheel. <br />
                        Drag to pan the chart.
                    </b>
                </p>
            </div>
            <div
                className="card"
                style={{
                    border: '2px solid',
                    padding: '15px',
                    margin: '5px',
                    alignItems: 'center',
                    overflow: 'hidden',
                    ...(!isLoaded && {
                        height: '78vh',
                        display: 'flex',
                        justifyContent: 'center',
                    }),
                }}
            >
                {!isLoaded ? (
                    <ProgressSpinner strokeWidth="8" />
                ) : (
                    <div
                        onMouseDown={startDrag}
                        onMouseMove={onDrag}
                        onMouseUp={stopDrag}
                        onMouseLeave={stopDrag}
                        onWheel={handleWheel}
                        ref={chartRef}
                        style={{
                            display: 'flex',
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transformOrigin: 'top center',
                            transition: isDragging ? 'none' : 'transform 0.2s ease-in-out',
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <OrganizationChart
                            value={data}
                            selectionMode="multiple"
                            selection={selection}
                            onSelectionChange={(e) => setSelection(e.data)}
                            nodeTemplate={nodeTemplate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
