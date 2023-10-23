const Users = require("../models/user.model");

const isChecked = async (ctx, next) => {
    const telegramId = ctx.from.id;
    const firstname = ctx.from.first_name;
    const username = ctx.from.username;
    try {
      const findUser = await Users.findOne({ telegramId });
      if (!findUser) {
        await Users.create({ telegramId, firstname, username });
      } else if (!findUser.status) {
        await Users.findByIdAndUpdate(telegramId, { status: true });
      }
      next();
    } catch (error) {
      next();
    }
  };

module.exports = isChecked
  