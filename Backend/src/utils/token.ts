import jwt from "jsonwebtoken";
import crypto from "crypto";


export const createToken = (email:string)=>{

    const accessToken = jwt.sign(
        {"email": email},
        process.env.ACCESS_TOKEN_S as string,
        {expiresIn:process.env.ACCESS_TOKEN_TTL}
    )

    const refreshToken = jwt.sign(
        {"email": email},
        process.env.REFRESH_TOKEN_S as string,
        {expiresIn:process.env.REFRESH_TOKEN_TTL}
    )

    return {
        access:accessToken,
        refresh:refreshToken
    }

}

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAoH5OSmFwJbTNI4hjRFon7K9D232NSicGPh9a4ygwT5la7RCe
aCukaa1U+Qr4dYz8HcJVl7Lw2TZQG/4G2ukFjRaCE/YFafz71I7uKG/ifaHbTtux
qQ6K5M0c3eac/+U3sgqOOt93VZ5TK/0yxcJFA9cu+suqZMbnhdEK5X6wluat8VJ3
586qHClmpj3ABmSvyTuHiG91f+4ANZdvkWJXvgyazgm//JoYPAPd2pFy29SsBdnn
wfHs9JlZYn1xwn0HTLc5mucsU8DdUlIdk5qoukxcnJyRN73IZWstEHeb1YOVHuSV
6N9drBfGvSZd6SYGRC+fNan8DSV3TtZ/3hmtfwIDAQABAoIBAAIWIkZtRdv3ocMY
ftHgqiw1ixhLZY7VOwuLtM7HMvmV8MysLqMEDjsheb1TGy/MCWsJn7s9JExunFQA
1W37IYtYA5Dm3eMm2s9EnGwCKFuhwwwfZwvfmIao8/seiGP7QuIZqQey6AZA7Kvh
uss/X05Redbg1vJAc7oVoaKiJwGPMOTrX3eH7Dq5t1wReUERJNBqGl5fcMwtB/4t
GzLSBmCahYzYg6U78j/YawXTV3aiPald9QORRSoNc+7Lp8vUoLiuc/7xcfa5CnuP
v3AvxU0MZfVCIfIlZEJ9sbvki39NDSjBqIvo0+0WD277LzduuUw6GBw9WWfAKbXu
PMwB2GECgYEA1MUCcXIbW/2+hFU6JGiJNO7cNS2oaIDlUKIzxXio0+x1w4w0keYs
/j/CdxU/Cn83U6dKuAjGGUYEuolvDw1TydkeVa8ei0xDKRbWm2LH+vTgk/+/e616
h1ekxHz4JhtqNftOerNrxU/BVKW1D70kc1TOoMhAkNbeodK40VqJBY0CgYEAwRo0
RBW7ylGDfzntk6RZHKNpTWd0XtbSjPWc8QeH4MaAj1Wk9RLxdpeyt9MItLA754K6
8MSA8LsDzHHRg1ATcL0o6YLJjvNbsHIZQU8bi99aDdLrvuvQWlQZRT6uhDIfPiUk
vP3AkJMG9y/lOifRR4gzOJ5AD4nv3BEqFTNyfjsCgYACNSkZVD3EbpWTee7ogc0q
p2/RfW/J5cx7UbOH0QCvcjymksXY3bKJ0M+LvMSyry87xviXgD/N81QJO3PTjCfa
aE5QRUjj2R65RmtjoVrB19icsIKkHeCvltE22LUacB5iAQGHdGUh3vn6jt2aFDRU
ngSm1m0VE6WruCwCwBW74QKBgQCpPq5Qfjv5NzhpafwwSvtPfmnszZ/Q/7fKk/rZ
xh/xgglrl0TdB51as9qQAwa+Vzgp0QrHu3LHiyHpLljTHnvrc99Hyrmd8O2L2HUK
KKucDEaBlzvIOiaDBPKhHi8W7lczwJpSipUcIcEZJYFjV0K1z0oVdZ3wAJWZ6/FW
Y6EVwQKBgQCG6oq59upP3mdI3fGthFaM6dW8w/eWt+INpwBx3TxTqaBpmY0bA6ki
E7tbeeptuGWPaHyxOWxOxaX8ocOf5kJP8Kh/NUch6MyE2Jh+dgKYIpUc9l++9tJO
29MqZWBdrTIlJ4400i/D77TrpQkG8szA0x26XeM6BuFFgqc3y7QWxA==
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoH5OSmFwJbTNI4hjRFon
7K9D232NSicGPh9a4ygwT5la7RCeaCukaa1U+Qr4dYz8HcJVl7Lw2TZQG/4G2ukF
jRaCE/YFafz71I7uKG/ifaHbTtuxqQ6K5M0c3eac/+U3sgqOOt93VZ5TK/0yxcJF
A9cu+suqZMbnhdEK5X6wluat8VJ3586qHClmpj3ABmSvyTuHiG91f+4ANZdvkWJX
vgyazgm//JoYPAPd2pFy29SsBdnnwfHs9JlZYn1xwn0HTLc5mucsU8DdUlIdk5qo
ukxcnJyRN73IZWstEHeb1YOVHuSV6N9drBfGvSZd6SYGRC+fNan8DSV3TtZ/3hmt
fwIDAQAB
-----END PUBLIC KEY-----`


// sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
    return jwt.sign(payload, process.env.PRK || privateKey, { algorithm: "RS256", expiresIn });
  }
  
// verify jwt
export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.PK || publicKey);
        return { payload: decoded, expired: false };
    } catch (error) {
        //@ts-ignore
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}




