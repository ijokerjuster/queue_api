const _ = require('lodash');

module.exports = {
    serialize(users = []) {
        const userSerialized = users.map(user => {
            return {
                id: user._id.toString(),
                ..._.pick(user, ['username', 'name', 'email', 'phone', 'imagePath']),
            }
        })
        return {
            users: userSerialized,
        }
    }
}