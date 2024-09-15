import { Request, Response, NextFunction } from 'express';
import { verifySession, TokenPayload } from '../services/userService';  
 
interface RequestWithUser extends Request {
    user?: TokenPayload;  
}

export const authMiddleware = () => (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['x-authorization'] as string | undefined;  

    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;  
        }
        next();
    } catch (err) {
        res.status(498).json({ message: 'Invalid access token. Please sign in' });
    }
};