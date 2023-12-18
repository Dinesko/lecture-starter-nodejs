import {USER} from "../models/user.js";

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for USER entity during creation
    const user = req.body;
    if ('id' in user) {
        return res.status(400).json({error: true, message: 'id should not be provided'});
    }

    for (let key in USER) {
        if (!user.hasOwnProperty(key) && key !== 'id') {
            return res.status(400).json({error: true, message: `Missing or invalid field: ${key}`});
        }
    }

    for (let key in user) {
        if (!USER.hasOwnProperty(key)) {
            return res.status(400).json({error: true, message: `Unexpected field: ${key}`});
        }
    }

    if (!user.email.endsWith('@gmail.com')) {
        return res.status(400).json({error: true, message: 'Email should be a Gmail account'});
    }

    if (!user.phoneNumber.startsWith('+380') || user.phoneNumber.length !== 13
    ) {
        return res.status(400).json({error: true, message: 'Invalid phone number format'});
    }

    if (user.password.length < 3) {
        return res.status(400).json({error: true, message: 'Password should be at least 3 characters long'});
    }
    next();
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const user = req.body;
    if ('id' in user) {
        return res.status(400).json({error: true, message: 'id should not be provided'});
    }

    if (!Object.keys(USER).some(key => key in user)) {
        return res.status(400).json({error: true, message: 'At least one valid field required'});
    }

    for (let key in user) {
        if (!USER.hasOwnProperty(key)) {
            return res.status(400).json({error: true, message: `Unexpected field: ${key}`});
        }
    }

    if (user.email && !user.email.endsWith('@gmail.com')) {
        return res.status(400).json({error: true, message: 'Email should be a Gmail account'});
    }

    if (user.phoneNumber && (!user.phoneNumber.startsWith('+380') || user.phoneNumber.length !== 13)
    ) {
        return res.status(400).json({error: true, message: 'Invalid phone number format'});
    }

    if (user.password && user.password.length < 3) {
        return res.status(400).json({error: true, message: 'Password should be at least 3 characters long'});
    }
    next();
};

export {createUserValid, updateUserValid};
