import { createUser, getUserByEmail } from 'db/users';
import express from 'express';
import { authentication, generateHash } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(409);
        }

        const salt = generateHash();

        const newUser = await createUser({
            email,
            username,
            authentication: {
                password: authentication(salt, password),
                salt,
            },
        });

        return res.status(200).json(newUser).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}