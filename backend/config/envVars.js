import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    MONGO: process.env.MONGO,
    PORT: process.env.PORT || 2000,
    JWT_SECRET: process.env.JWT_SECRET,
};