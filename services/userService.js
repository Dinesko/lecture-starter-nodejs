import {userRepository} from "../repositories/userRepository.js";

class UserService {
    // TODO: Implement methods to work with user
    search(search) {
        const item = userRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    createUser(user) {
        const userWithEmailInDb = userRepository.getOne({email: user.email})
        const userWithPhoneInDb = userRepository.getOne({phoneNumber: user.phoneNumber})

        if (userWithEmailInDb && userWithEmailInDb.email.toLowerCase() === user.email.toLowerCase()) {
            throw new Error('User with such email already exist')
        }
        if (userWithPhoneInDb && userWithPhoneInDb.phoneNumber === user.phoneNumber) {
            throw new Error('User with such phoneNumber already exist')
        }
        const item = userRepository.create(user)
        if (!item) {
            return null;
        }
        return item
    }

    getUsers() {
        return userRepository.getAll()
    }

    updateUser(id, data) {
        const userInDb = userRepository.getOne({id})
        if (userInDb && data.email && userInDb.email.toLowerCase() === data.email.toLowerCase()) {
            throw new Error('User with such email already exist')
        }
        if (userInDb && data.phoneNumber && userInDb.phoneNumber === data.phoneNumber) {
            throw new Error('User with such phoneNumber already exist')
        }
        return userRepository.update(id, data)
    }

    deleteUser(id) {
        return userRepository.delete(id)
    }
}

const userService = new UserService();

export {userService};
