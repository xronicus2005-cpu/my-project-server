// routes/user.js  (yoki tegishli fayl)
const { User } = require('../modules/user');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const updateUserInfo = async (req, res) => {
  try {
    
    const userID = req.params.id;
    if (!userID) return res.status(400).send('User id kerak');

    // validate request body basic shape
    const { error } = reqChecker(req.body);
    if (error) return res.status(400).send('Maydonlar togri emas');

    // destructure incoming
    const {
      login,
      emailAddress,
      address = {},
      number,
      password,     // eski parol (foydalanuvchi tasdiqlashi uchun)
      newPassword   // yangi parol (agar parolni yangilamoqchi bo‘lsa)
    } = req.body;

    // get existing user from DB
    const existingUser = await User.findById(userID);
    if (!existingUser) return res.status(404).json({message: 'Foydalanuvchi topilmadi'});

    // ---- CHECK uniqueness only if user wants to change login/email ----
    if (login && login !== existingUser.login) {
      const someone = await User.findOne({ login });
      if (someone && someone._id.toString() !== userID) {
        return res.status(400).json({message: "Login zanit"});
      }
    }

    if (emailAddress && emailAddress !== existingUser.emailAddress) {
      const someone = await User.findOne({ emailAddress });
      if (someone && someone._id.toString() !== userID) {
        return res.status(400).json({message: "Email dizimnen otken"});
      }
    }

    // ---- HANDLE password change OR simple update ----
    const isPasswordEmpty = !password && password !== '' ? true : (password === '' || password == null);
    const isNewPasswordEmpty = !newPassword && newPassword !== '' ? true : (newPassword === '' || newPassword == null);

    // If both password and newPassword are empty -> update non-password fields
    if ((password === '' || password == null) && (newPassword === '' || newPassword == null)) {
      // prepare update object (only fields we want to update)
      const update = {
        login: login ?? existingUser.login,
        emailAddress: emailAddress ?? existingUser.emailAddress,
        address: {
          state: address?.state ?? existingUser.address?.state,
          city: address?.city ?? existingUser.address?.city
        },
        number: number ?? existingUser.number
      };

      const updatedUser = await User.findByIdAndUpdate(userID, update, { new: true });
      if (!updatedUser) return res.status(404).send('Foydalanuvchi topilmadi (yangilashda)');
      return res.status(200).json({ message: "Janalandi", user: updatedUser });
    }

    // If user wants to change password, both password and newPassword must be provided
    if ((password === '' || password == null) || (newPassword === '' || newPassword == null)) {
      return res.status(400).json({message: "paroller kiritilmegen"});
    }

    // verify old password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) return res.status(400).json({ message: "Eski parol qate"});

    // hash new password and update all fields (including login/email checks done above)
    const hashed = await bcrypt.hash(newPassword, 10);

    const updateWithPass = {
      login: login ?? existingUser.login,
      emailAddress: emailAddress ?? existingUser.emailAddress,
      address: {
        state: address?.state ?? existingUser.address?.state,
        city: address?.city ?? existingUser.address?.city
      },
      number: number ?? existingUser.number,
      password: hashed
    };

    const updatedUser = await User.findByIdAndUpdate(userID, updateWithPass, { new: true });
    if (!updatedUser) return res.status(404).send('Foydalanuvchi topilmadi (parol yangilashda)');

    return res.status(200).json({ message: "Janalandi", user: updatedUser });

  } catch (err) {
    console.error('updateUserInfo error:', err);
    // agar Mongo duplicate key xatosi bo‘lsa, aniqroq javob qaytarish ham mumkin
    if (err.code === 11000) {
      return res.status(400).send('Takrorlanayotgan unikal maydon (login yoki email)');
    }
    return res.status(500).send('Serverda xatolik yuz berdi');
  }
};

function reqChecker(body) {
  return Joi.object({
    login: Joi.string().min(3).max(50).required(),         // agar frontend har doim yuboradi deb qoldirsang required bo'lsa
    emailAddress: Joi.string().email().required(),
    address: Joi.object({
      state: Joi.string().required(),
      city: Joi.string().required()
    }).required(),
    number: Joi.string().required(),
    password: Joi.string().allow('', null),
    newPassword: Joi.string().allow('', null)
  }).validate(body);
}

module.exports = updateUserInfo;
