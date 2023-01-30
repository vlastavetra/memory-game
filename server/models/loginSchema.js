const loginSchema = {
    type: "object",
  
    properties: {
      email: {
        type: "string", minLength:3, pattern: "@"
      
      },
      password: {
        type: "string",
      },
    },
    required: ["email", "password"],
  };
  
  module.exports = {loginSchema};
  