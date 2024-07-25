const router = require('express').Router();
const {Post, Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async(req,res)=>{

    try{
        const postData = await Post.findAll();
        if(!postData){
            console.log('No posts returned from database.');
            res.status(400).json({message: "No post to show."});
            return;
        }
        const posts = postData.map((post)=>post.get({plain:true}));
    
        res.render('homepage', {posts, logged_in: req.session.logged_in});
    }catch(err){
        //res.status(500).json(err);
    }
    
});

router.get('/post/:id', withAuth, async (req, res)=>{
    try{
        console.log(`Params ID = ${req.params.id}`);
        const postId = req.params.id;
        console.log(`Post ID = ${postId}`);
        const postData = await Post.findByPk(postId, {
            include: [
                { 
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'date',
                        'user_id'
                    ]
                }
            ]
        })
        if(!postData){
            console.log('No posts returned from database.');
            res.status(400).json({message: "No post to show."});
            return;
        }
        const post = postData.get({plain: true});

        res.render('post', {post, logged_in: req.session.logged_in});
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req,res)=>{
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }else{
        res.render('login');
    }
});

module.exports = router;