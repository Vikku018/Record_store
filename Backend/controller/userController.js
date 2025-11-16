// import User from '../../frontend/src/getuser/User';
import user from '../model/userModel.js'

export const create = async (req, res) => {
    try {
        const newUser = new user(req.body);
        const { email } = newUser;

        const userExist = await user.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const saveDate = await newUser.save();
        res.status(200).json({ message: "User create Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllusers = async (req, res) => {
    try {
        const userData = await user.find();
        if (!userData || userData.length === 0) {
            return res.status(400).json({ message: "User Data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getAllUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await user.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ userExist });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await user.findById(id);
        if (!userExist) {
        return res.status(404).json({ message: "User not found" });
    }
        const updateData = await user.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

    export const deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const userExist = await user.findById(id);
            if (!userExist) {
                return res.status(404).json({ message: "User not found" });
            }
                await user.findByIdAndDelete(id);
                res.status(200).json({ message: "User deleted successfully!" });
            } catch (error) {
            
            res.status(500).json({ errorMessage: error.message });
            }
        }