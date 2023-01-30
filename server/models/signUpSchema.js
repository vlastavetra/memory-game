const schema = {
  type: "object",
  required: [
    "email",
    "password",
    "firstName",
    "lastName",
    "username",
    "confirmPassword",
  ],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    confirmPassword: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    username: {
      type: "string",
    },
  },
};

module.exports = { schema };
