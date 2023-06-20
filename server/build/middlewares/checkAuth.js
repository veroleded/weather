import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default async (req, res, next) => {
    const token = (req.headers.authorization ?? '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
            const { id } = decoded;
            req.userId = id;
            next();
        }
        catch (error) {
            console.error('checkAuth:', error);
            res.status(403).json({
                message: 'Access denied',
            });
        }
    }
    else {
        res.status(403).json({
            message: 'Access denied',
        });
    }
};
//# sourceMappingURL=checkAuth.js.map