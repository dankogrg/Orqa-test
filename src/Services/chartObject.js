import { getEmployees } from '../utils/fetch';

export const getAllEmployees = async () => {
    let i = 1;
    let graphData = [];

    let result;
    do {
        result = await getEmployees(i);
        graphData.push(result.data);
        i++;
    } while (result.data.length != 0);

    graphData = graphData.flat();

    return graphData;
};

export const getGraphData = async () => {
    const employeeList = await getAllEmployees();

    let map = {};
    let rootArray = [];
    for (let entry of employeeList) {
        map[entry.id] = { expanded: false, data: entry };
    }

    for (let entry of employeeList) {
        entry.subordinates = [];
    }

    console.log(map);

    let root = { expanded: false, data: {} };
    root.data = employeeList.find((x) => x.manager_id == null);

    if (root == null) return null;

    for (let entry of employeeList) {
        if (entry === root.data) continue;
        let parent = map[entry.manager_id];

        parent.data.subordinates.push(map[entry.id]);
    }
    root.expanded = true;
    for (const entry of root.data.subordinates) {
        entry.expanded = true;
    }
    rootArray.push(root);
    console.log(rootArray);

    return rootArray;
};
