import { API_EMPLOYEES } from './enspoints';

export const getEmployees = async (x: any) => {
    const response = await fetch(API_EMPLOYEES + x).then((result) => result.json());

    return response;
};
