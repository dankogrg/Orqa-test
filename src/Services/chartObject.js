import { getEmployees } from '../utils/fetch';

export const getAllEmployees = async () => {
    let i = 1;
    let graphData = [];
    console.log(graphData);
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
    console.log(employeeList);
    const tree = employeeList[0];
    for (const i of employeeList) {
        if (i != tree) {
            if (tree.id == i.manager_id) {
                if (!tree.subordinates) {
                    tree.subordinates = [];
                }
                tree.subordinates.push(i);
            }
        }
    }

    if (tree.subordinates) {
        for (const i of tree.subordinates) {
            for (const ii of employeeList) {
                if (i != ii) {
                    if (i.id == ii.manager_id) {
                        if (!i.subordinates) {
                            i.subordinates = [];
                        }

                        i.subordinates.push(ii);
                    }
                }
            }
        }
    }
    console.log(tree);
};
