
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

export const LikeType = {
    COMMENT: 'COMMENT',
    POST: 'POST'
};

export type PostOrderType = 'LATEST'|'LIKES'
export const PostOrder = {
    LATEST: 'LATEST',
    LIKES: 'LIKES'
}


export type PostSelectionType = 'PUBLIC'|'USER'|'GROUP'
export const PostSelection = {
    PUBLIC:'PUBLIC',
    USER: 'USER',
    GROUP: 'GROUP'
}

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


    /*

    CREATE TABLE bf_posts (
        id int PRIMARY KEY AUTO_INCREMENT ,
        user_id int not null,
        media_id int not null,
        content varchar(2048) ,
        created_at datetime,
        likes int DEFAULT 0
    );


    */

export type PostType = {
    user: number,
    media: number
    content: string,
    created_at: string,
    likes:number
}

export type CommentType = {
    id:number,
    user: string,
    content: string,
    responses: CommentResponseType[]
    created_at: string,
    likes:number
}

export type CommentResponseType = {
    id:number,
    user: string,
    content: string,
    created_at: string,
    likes:number

}
