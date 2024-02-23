const EnvVariables = require("../models/EnvVariables");

let envVar = {
  smtpUser: "",
  smtpPassword: "",
  senderEmail: "",
};

const getEnvVar = async () => {
  const env = await EnvVariables.find();
  if (env) {
    envVar.smtpUser = env[0]?.smtpUser;
    envVar.smtpPassword = env[0]?.smtpPassword;
    envVar.senderEmail = env[0]?.senderEmail;
  }

  return envVar;
};

module.exports.getEnvVar = getEnvVar;
module.exports.envVar = envVar;
