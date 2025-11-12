import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

interface UserData {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  roleId: string;
  positionId?: string;
}

interface UpdateUserData {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
}

// Hash user password
const hashUserPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// Create a new user
const createNewUser = (data: UserData): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        positionId: data.positionId,
      });

      resolve("OK create a new user successful");
    } catch (e) {
      reject(e);
    }
  });
};

// Get all users
const getAllUsers = (): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// Get user by id
const getUserInfoById = (userId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ 
        where: { id: userId }, 
        raw: true 
      });
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Update user data
const updateUserData = (data: UpdateUserData): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        
        const allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Delete user by id
const deleteUserById = (userId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: userId } });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};