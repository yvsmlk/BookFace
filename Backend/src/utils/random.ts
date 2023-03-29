
export const randomTag = (len = 25) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '@';
        for(var i = 0; i < len; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
}