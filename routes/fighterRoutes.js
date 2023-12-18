import {Router} from "express";
import {fighterService} from "../services/fighterService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";
import {
    createFighterValid,
    updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.post("/",
    createFighterValid,
    (req, res, next) => {
        const {name, power, defense, health} = req.body
        try {
            res.data = fighterService.createFighter({
                name,
                power,
                defense,
                health: health || 100
            })
        } catch (err) {
            res.err = err
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.get("/",
    (req, res, next) => {
        try {
            res.data = fighterService.getFighters()
        } catch (err) {
            res.err = err
        } finally {
            next();
        }
    },
    responseMiddleware
)

router.get("/:id",
    (req, res, next) => {
        const {id} = req.params
        try {
            res.data = fighterService.getFighter({id})
        } catch (err) {
            res.err = err
        } finally {
            next();
        }
    },
    responseMiddleware
)

router.put("/:id",
    updateFighterValid,
    (req, res, next) => {
        const {id} = req.params
        const data = req.body
        try {
            res.data = fighterService.updateFighter(id, data)
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    },
    responseMiddleware
)
router.delete("/:id",
    (req, res, next) => {
        const {id} = req.params
        try {
            res.data = fighterService.deleteFighter(id)
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    },
    responseMiddleware
)

export {router};
