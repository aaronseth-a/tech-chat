const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const seedUsers = require('./userData.json');
const seedPosts = require('./postData.json');
const seedComments = require('./commentData.json');

const seedAll = async()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(seedUsers,{
        individualHooks: true,
        returning: true,
    });
    await Post.bulkCreate(seedPosts);
    await Comment.bulkCreate(seedComments);
}

seedAll();