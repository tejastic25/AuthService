const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyparser = require("body-parser");
const apiroutes = require('./routes/index');
const db = require('./models/index');
const sequelize = require('sequelize');
const { User, Role } = require('./models/index');
const PrepareAndStartServer = () => {
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use('/api', apiroutes);

    app.listen(PORT, async () => {
        console.log(`Sever started on Port : ${PORT}`);
        if (process.env.SYNC_DB) {
            db.sequelize.sync({ alter: true });
        }
        // const user = await User.findByPk(14);
        // const role = await Role.findByPk(1);
        // user.addRole(role);
    //    console.log(await user.hasRole(ADMIN));
    });

}
PrepareAndStartServer();