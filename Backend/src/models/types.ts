
// 100 - 199 general message
// 200 - 399 db error
// 400+ other
export const StatusTypes = {
    100: 'Success',
    200: 'Already exist',
    201: 'Input does not exist',
    202: 'Request fail',
    400: 'Input missing',
    401: 'Incorrect input',
    402: 'Incorrect input type',
    403: 'Not authorized',
    404: 'System error',
    405: 'Already connected',
    406: 'Missing Token'
};

export const TagTypes = {
    USER: 'USER',
    GROUP: 'GROUP',
    EVENT: 'EVENT'
    
};


export type ResponseMsg = {
    status: number,
    message: string,
    content: object | []
}


export type UserResponseInfo = {
    tag: string,
    username: string,
    email: string,
    created: string
    status: number,
    picture: string,
    banner: string
}