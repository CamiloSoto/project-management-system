import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    mongo: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    },
}));
