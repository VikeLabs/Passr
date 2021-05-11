import { User } from './index';

// Responsibilities of these functions are to just call our API with the relevant information
// Parse the response and deal with API errors, and let the caller know of failure
// in a useful way.

export const getUser = async () => {
    const response = await fetch('https://api.passr.ca/user', {
        method: 'GET',
    });
    const user = (await response.json()) as User;
    return user;
};

export const updateUser = async (updatedUser: User) => {
    // Make sure to send the updatedAt timestamp with the request
    // So the server can make sure that we aren't updating
    // based on old information
    // return user data from database (mainly for timestamps)

    const response = await fetch('https://api.passr.ca/user', {
        method: 'POST',
        body: JSON.stringify(updateUser),
    });
};

export const createUser = async (newUser: User) => {
    // Call create user, fails if user already exists with same id from credential
    // Return newly created user
};

export const deleteUser = async (user: User) => {
    // Call delete user

    return false;
};