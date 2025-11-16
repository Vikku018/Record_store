import express from 'express'
import { create, getAllusers, getAllUserById, updateUser, deleteUser } from '../controller/userController.js'

const route = express.Router();

route.post('/user', create);
route.get('/users', getAllusers);
route.get('/user/:id', getAllUserById)
route.put('/update/user/:id', updateUser)
route.delete('/delete/user/:id', deleteUser)

export default route;