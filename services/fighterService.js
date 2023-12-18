import {fighterRepository} from "../repositories/fighterRepository.js";
import {userRepository} from "../repositories/userRepository.js";

class FighterService {
    // TODO: Implement methods to work with fighters
    createFighter(fighter) {
        const fighterInDb = fighterRepository.getOne({name: fighter.name})
        if (fighterInDb && fighterInDb.name.toLowerCase() === fighter.name.toLowerCase()) {
            throw new Error('Fighter already exist')
        }
        const item = fighterRepository.create(fighter)
        if (!item) {
            return null;
        }
        return item
    }

    getFighters() {
        return fighterRepository.getAll()
    }

    getFighter(search) {
        return fighterRepository.getOne(search)
    }

    updateFighter(id, data) {
        const fighterInDb = fighterRepository.getOne({id})
        if (fighterInDb && data.name && fighterInDb.name.toLowerCase() === data.name.toLowerCase()) {
            throw new Error('Fighter with such name already exist')
        }
        return fighterRepository.update(id, data)
    }

    deleteFighter(id) {
        const fighter = fighterRepository.getOne({id})
        if (!fighter) {
            throw Error(`Fighter with id:${id} does not exist`)
        }
        return fighterRepository.delete(id)
    }
}

const fighterService = new FighterService();

export {fighterService};
