import {Router} from "express";
import {userService} from "../services/userService.js";
import {
    createUserValid,
    updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.post(
    "/",
    createUserValid,
    (req, res, next) => {
        const {firstName, lastName, email, phoneNumber, password} = req.body
        try {
            res.data = userService.createUser({
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            })
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    },
    responseMiddleware
);
router.get("/",
    (req, res, next) => {
        try {
            res.data = userService.getUsers()
        } catch (err) {
            res.err = err;
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
            res.data = userService.search({id})
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    }, responseMiddleware
)
router.put("/:id",
    updateUserValid,
    (req, res, next) => {
        const {id} = req.params
        const data = req.body
        try {
            res.data = userService.updateUser(id, data)
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    }, responseMiddleware
)
router.delete("/:id",
    (req, res, next) => {
        const {id} = req.params

        try {
            const user = userService.search({id})
            if (!user) {
                throw Error(`${id} does not exist`)
            }
            res.data = userService.deleteUser(id)
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    }, responseMiddleware
)

export {router};
