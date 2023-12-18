import {FIGHTER} from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for FIGHTER entity during creation
    const fighter = req.body;

    if ('id' in fighter) {
        return res.status(400).json({error: true, message: 'ID should not be provided'});
    }

    for (let key in FIGHTER) {
        if (key !== 'health' && !fighter.hasOwnProperty(key) && key !== 'id') {
            return res.status(400).json({error: true, message: `Missing or invalid field: ${key}`});
        }
    }

    if (fighter.power < 1 || fighter.power > 100) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power field is out of range must be from 1 to 100'
        });
    }
    if (fighter.defense < 1 || fighter.defense > 10) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power defense is out of range must be from 1 to 10'
        });
    }
    if (fighter.health && (fighter.health < 80 || fighter.health > 120)) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power health is out of range must be from 80 to 120'
        });
    }

    for (let key in fighter) {
        if (!FIGHTER.hasOwnProperty(key)) {
            return res.status(400).json({error: true, message: `Unexpected field: ${key} `});
        }
    }
    next();
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for FIGHTER entity during update
    const fighter = req.body;

    if ('id' in fighter) {
        return res.status(400).json({error: true, message: 'ID should not be provided'});
    }

    if (!Object.keys(FIGHTER).some(key => key in fighter)) {
        return res.status(400).json({error: true, message: 'At least one valid field required'});
    }

    if (fighter.power < 1 || fighter.power > 100) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power field is out of range must be from 1 to 100'
        });
    }
    if (fighter.defense < 1 || fighter.defense > 10) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power defense is out of range must be from 1 to 10'
        });
    }
    if (fighter.health && (fighter.health < 80 || fighter.health > 120)) {
        return res.status(400).json({
            error: true,
            message: 'Fighter power health is out of range must be from 80 to 120'
        });
    }

    for (let key in fighter) {
        if (!FIGHTER.hasOwnProperty(key)) {
            return res.status(400).json({error: true, message: `Unexpected field: ${key}`});
        }
    }
    next();
};

export {createFighterValid, updateFighterValid};
