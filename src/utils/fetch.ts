import { API_TEMPLATE } from './enspoints';

export const getEmployees = async (x: Number) => {
    const response = await fetch(API_TEMPLATE + x).then((result) => result.json());

    return response;
};
