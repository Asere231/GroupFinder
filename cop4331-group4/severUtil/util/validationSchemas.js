const registrationValidationSchema = {
  firstName: {
    isLength: {
      options: { min: 2 },
      errorMessage: "First name has to be at least 2 characters long",
    },
  },
  lastName: {
    isLength: {
      options: { min: 2 },
      errorMessage: "Last name has to be at least 2 characters long",
    },
  },
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters long with a maximum of 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Password must be at least 5 characters long with a maximum of 32 characters long",
    },
    custom: {
      options: (value) => {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialCharacters.test(value);
      },
      errorMessage: "Password must contain at least one special character",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
};

const loginValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters long with a maximum of 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: 32,
      },
      errorMessage:
        "Password must be at least 8 characters long with a maximum of 32 characters long",
    },
    custom: {
      options: (value) => {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialCharacters.test(value);
      },
      errorMessage: "Password must contain at least one special character",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
};

const createTableValidationSchema = {
  tableNum: {
    notEmpty: {
      errorMessage: "Please enter table number",
    },
  },
  title: {
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Please describe your study group better",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
  },
  subject: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "Please write an appropriate subject",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
  },
  maxCapacity: {
    notEmpty: {
      errorMessage: "Table's max capacity cannot be empty",
    },
  },
  currCapacity: {
    notEmpty: {
      errorMessage: "Please enter the current capacity",
    },
  },
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters long with a maximum of 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
  userId: {
    notEmpty: {
      errorMessage: "User id cannot be empty",
    },
  },
  // usersAtTable: {
  //   notEmpty: "User cannot be empty",
  // },
};

const postValidationSchema = {
  userId: {
    notEmpty: {
      errorMessage: "User id cannot be empty",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
  // tableNum: {
  //   notEmpty: {
  //     errorMessage: "Table number cannot be empty",
  //   },
  // },
  title: {
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
  },
  tag: {
    notEmpty: {
      errorMessage: "Tag cannot be empty",
    },
  },
  postBody: {
    isLength: {
      options: {
        min: 10,
      },
      errorMessage: "Please describe post's reason better",
    },
  },
};

module.exports = {
  registrationValidationSchema,
  loginValidationSchema,
  createTableValidationSchema,
  postValidationSchema,
};
