import crypto from 'crypto';

const SECRET = 'TEST-REST-API-KEY';

export const generateHash = () => crypto.randomBytes(20).toString('base64');
export const authentication = (salt:string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}