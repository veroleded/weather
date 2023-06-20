import { validationResult } from 'express-validator';
export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('valdidation error: ', errors.array());
        return res.status(400).json({
            message: 'validation error',
            errors: errors.array(),
        });
    }
    next();
};
//# sourceMappingURL=handleValidationsErrors.js.map