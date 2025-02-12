const dbClient = require("./dbClient");

class UserRepository {
    registerUser = async (userDetails) => {
        const result = await dbClient.create({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
        });

        return result;
    };

    isUserAlreadyResgistered = async (name, email) => {
        const result = await dbClient.findOne({
            $or: [{ name: name }, { email: email }],
        });
        if (!result) {
            return false;
        }
        return result;
    };

    getUserByNameOrEmail = async (nameOrEmail) => {
        const result = await dbClient.findOne({
            $or: [{ name: nameOrEmail }, { email: nameOrEmail }],
        });
        if (!result) {
            return false;
        }
        return result;
    };

    getUserByEmail = async (email) => {
        const result = await dbClient.findOne({ email: email });
        if (!result) {
            return false;
        }
        return result;
    };

    updatePassword = async (userId, updatedPassword) => {
        const result = await dbClient.findByIdAndUpdate(
            userId,
            {
                $set: { password: updatedPassword },
            },
            { new: true }
        );

        if (!result) {
            return false;
        }
        return result;
    };
}

module.exports = UserRepository;
