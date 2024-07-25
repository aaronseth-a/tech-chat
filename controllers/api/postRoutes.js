const router = require('express').Router();
const { Post, Comment } = require('../../models')


// router.get('/',async (req,res)=>{
//     try{
//         const postData = await Post.findAll();
//         if(!postData){
//             res.status(400).json({message:'No posts available.'});
//             return;
//         }

//         res.status(200).json(postData);

//     }catch(err){
//         res.status(500).json(err);
//     }

// });
// router.get('/:id');
// router.post();
// router.put();
// router.delete();

module.exports = router;