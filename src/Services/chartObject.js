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
        map[entry.id] = { expanded: false, data: entry, children: [] };
    }

    console.log(map);

    // let root = { expanded: false, data: {}, children: [] };
    // root.data = employeeList.find((x) => x.manager_id == null);
    let root;
    for (const element in map) {
        if (map[element].data.manager_id == null) {
            root = map[element];
        }
    }

    if (root == null) return null;

    for (let entry of employeeList) {
        if (entry === root.data) continue;
        let parent = map[entry.manager_id];

        parent.children.push(map[entry.id]);
    }
    root.expanded = true;
    for (const entry of root.children) {
        entry.expanded = true;
    }

    rootArray.push(root);
    return rootArray;
};
