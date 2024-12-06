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

    const extendTree = (branch) => {
        for (const i of branch) {
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
    };
    extendTree(tree.subordinates);

    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            for (const iii of employeeList) {
                if (ii != iii) {
                    if (ii.id == iii.manager_id) {
                        if (!ii.subordinates) {
                            ii.subordinates = [];
                        }

                        ii.subordinates.push(iii);
                    }
                }
            }
        }
    }

    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    for (const iv of employeeList) {
                        if (iii != iv) {
                            if (iii.id == iv.manager_id) {
                                if (!iii.subordinates) {
                                    iii.subordinates = [];
                                }

                                iii.subordinates.push(iv);
                            }
                        }
                    }
                }
            }
        }
    }
    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    if (iii.subordinates) {
                        for (const iv of iii.subordinates) {
                            for (const index of employeeList) {
                                if (iv != index) {
                                    if (iv.id == index.manager_id) {
                                        if (!iv.subordinates) {
                                            iv.subordinates = [];
                                        }

                                        iv.subordinates.push(index);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    if (iii.subordinates) {
                        for (const iv of iii.subordinates) {
                            if (iv.subordinates) {
                                for (const v of iv.subordinates) {
                                    for (const index of employeeList) {
                                        if (v != index) {
                                            if (v.id == index.manager_id) {
                                                if (!v.subordinates) {
                                                    v.subordinates = [];
                                                }

                                                v.subordinates.push(index);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    if (iii.subordinates) {
                        for (const iv of iii.subordinates) {
                            if (iv.subordinates) {
                                for (const v of iv.subordinates) {
                                    if (v.subordinates) {
                                        for (const vi of v.subordinates) {
                                            for (const index of employeeList) {
                                                if (vi != index) {
                                                    if (vi.id == index.manager_id) {
                                                        if (!vi.subordinates) {
                                                            vi.subordinates = [];
                                                        }

                                                        vi.subordinates.push(index);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    if (iii.subordinates) {
                        for (const iv of iii.subordinates) {
                            if (iv.subordinates) {
                                for (const v of iv.subordinates) {
                                    if (v.subordinates) {
                                        for (const vi of v.subordinates) {
                                            if (vi.subordinates) {
                                                for (const vii of vi.subordinates) {
                                                    for (const index of employeeList) {
                                                        if (vii != index) {
                                                            if (vii.id == index.manager_id) {
                                                                if (!vii.subordinates) {
                                                                    vii.subordinates = [];
                                                                }

                                                                vii.subordinates.push(index);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (const i of tree.subordinates) {
        for (const ii of i.subordinates) {
            if (ii.subordinates) {
                for (const iii of ii.subordinates) {
                    if (iii.subordinates) {
                        for (const iv of iii.subordinates) {
                            if (iv.subordinates) {
                                for (const v of iv.subordinates) {
                                    if (v.subordinates) {
                                        for (const vi of v.subordinates) {
                                            if (vi.subordinates) {
                                                for (const vii of vi.subordinates) {
                                                    if (vii.subordinates) {
                                                        for (const viii of vii.subordinates) {
                                                            for (const index of employeeList) {
                                                                if (viii != index) {
                                                                    if (viii.id == index.manager_id) {
                                                                        if (!viii.subordinates) {
                                                                            viii.subordinates = [];
                                                                        }

                                                                        viii.subordinates.push(index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(tree);
};
