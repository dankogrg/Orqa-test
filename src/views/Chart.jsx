import { getAllEmployees, getGraphData } from '../Services/chartObject';

export default function Chart() {
    getGraphData();
    return <div>Chart</div>;
}
