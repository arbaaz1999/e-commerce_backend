const bcrypt = require('bcrypt')
const asyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const create_user = asyncHandler(async (req, res) => {
  console.log(`Original URL is ${req.url}, and protocol is ${req.protocol}`)
  const { first_name, last_name, email_id, mobile_no, password, is_admin, pic } = req.body;

  const user_exist = await User.findOne({ $or: [{ email_id: email_id }, { mobile_no: mobile_no }] });

  if (user_exist) {
    return res.status(403).json({
      message: "Email or mobile is already exist"
    })
  }

  const user = await User.create({
    first_name,
    last_name,
    email_id,
    mobile_no,
    is_admin,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      message: "User Registered Successfully",
      data: user,
      error: null,
    });
  } else {
    return res.status(400).json({
      message: 'Some error occured!'
    });
  }
});

const login_auth = asyncHandler(async (req, res) => {
  console.log("isnide one");
  try {
    const { email_id, password } = req.body;

    const user = await User.findOne({ email_id });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(201).json({
        message: "Logged In Successfully",
        data: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email_id: user.email_id,
          mobile_no: user.mobile_no,
          is_admin: user.is_admin,
          pic: user.pic,
          token: jwt.sign({ id: user._id, is_admin: user.is_admin }, process.env.JWT_SECRET),
        },
        error: null,
      });
    } else {
      return res.status(404).json({
        message: "Wrong Email Id or Password",
        error: true
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
      error: err.message,
    });
  }
});

const get_all_users = asyncHandler(async (req, res) => {
  let page = req.query.page || 0;
  let limit = req.query.limit || 2
  const count = await User.find({}).count();
  const users = await User.find({}).limit(limit).skip(limit * page)
  if (users) {
    return res.status(200).json({
      message: "Users fetched successfully",
      total_users: count,
      data: users,
      error: null
    })
  } else {
    return res.status(404).json({
      message: "Users not found!",
      error: true
    })
  }

})


// update profile by user from user panel
const update_profile_by_user = async (req, res) => {
  try {
    const { first_name, last_name, email_id, mobile_no, pic, password } = req.body;
    console.log("user ruquested is ", req.user);
    const user = await User.findOne({ _id: req.user })

    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email_id = email_id || user.email_id;
      user.mobile_no = mobile_no || user.mobile_no;
      user.pic = pic || user.pic;

      if (password) {
        user.password = password;
      }
      const updated_profile = await user.save();
      return res.status(200).json({
        message: "User updated successfully",
        data: updated_profile,
        error: null,
      })
    } else {
      return res.status(404).json({
        message: 'User not found'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occured",
      error: error,
    });
  }
};

// update profile by admin from admin panel
const update_profile_by_admin = async (req, res) => {
  try {
    const { id } = req.params
    const { first_name, last_name, email_id, mobile_no, pic, password, is_admin } = req.body;
    const user = await User.findOne({ _id: id })

    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email_id = email_id || user.email_id;
      user.mobile_no = mobile_no || user.mobile_no;
      user.is_admin = is_admin || user.is_admin;
      user.pic = pic || user.pic;

      if (password) {
        user.password = password;
      }
      const updated_profile = await user.save();
      return res.status(200).json({
        message: "User updated successfully",
        data: updated_profile,
        error: null,
      })
    } else {
      return res.status(404).json({
        message: 'User not found'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occured",
      error: error,
    });
  }
};

/* 
  getting a user details from user panel
*/

const get_user = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findOne({ _id: req.user });
    if (user) {
      return res.status(200).json({
        message: "Success",
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email_id: user.email_id,
          mobile_no: user.mobile_no,
          pic: user.pic
        },
        error: null,
      });
    } else {
      return res.status(404).json({
        message: "User Not Found",
        data: null,
        error: true,
      });
    }
  } catch (error) {
    console.log("Error inside the catch of getUser is : ", error.message);
    res.status(400).json({
      message: "Something went wrong",
      data: null,
      error: error.message,
    });
  }
};


/* 
  getting a user details from admin panel
*/

const get_user_admin = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json({
        message: "Success",
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email_id: user.email_id,
          mobile_no: user.mobile_no,
          is_admin: user.is_admin,
          pic: user.pic
        },
        error: null,
      });
    } else {
      return res.status(404).json({
        message: "User Not Found",
        data: null,
        error: true,
      });
    }
  } catch (error) {
    console.log("Error inside the catch of getUser is : ", error.message);
    res.status(400).json({
      message: "Something went wrong",
      data: null,
      error: error.message,
    });
  }
};


module.exports = { create_user, login_auth, get_all_users, get_user, get_user_admin, update_profile_by_user, update_profile_by_admin };