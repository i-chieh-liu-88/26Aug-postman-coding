//從 data 層匯入資料，以及錯誤處理輔助函式。
import UserModel from "../models/userModel.js";

import { httpError } from "../middlewares/errorHandler.js";

//定義 Create 的邏輯
export async function createUser(req, res, next) {
  const { name, email } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return next(httpError(400, "Die Felder name und email sind erforderlich"));
  }

  try {
    const newUser = await UserModel.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

//定義取得所有 user 的邏輯
export async function getAllUsers(req, res, next) {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

//定義取得單一 user 的邏輯
export async function getUserById(req, res, next) {
  // ID Validierung

  try {
    const foundUser = await UserModel.findById(req.params.id);

    if (!foundUser) {
      return next(httpError(404, "User nicht gefunden"));
    }

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
}

//定義完整更新（PUT）的邏輯
export async function updateUser(req, res, next) {
  const { name, email } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return next(httpError(400, "Die Felder name und email sind erforderlich"));
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedUser) {
      return next(httpError(404, "User nicht gefunden"));
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

//定義部分更新（PATCH）的邏輯
export async function patchUser(req, res, next) {
  const { name, email } = req.body;
  const updates = {};

  if (name !== undefined) {
    if (!name.trim()) {
      return next(httpError(400, "Der Name darf nicht leer sein"));
    }
    updates.name = name;
  }

  if (email !== undefined) {
    if (!email.trim()) {
      return next(httpError(400, "Die E-Mail darf nicht leer sein"));
    }
    updates.email = email;
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return next(httpError(404, "User nicht gefunden"));
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

//定義刪除的邏輯
export async function deleteUser(req, res, next) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(httpError(404, "User nicht gefunden"));
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}
