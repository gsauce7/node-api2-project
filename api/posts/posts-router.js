// implement your posts router here
const Posts = require('./posts-model.js');
const express = require("express")
const router = express.Router()


// POSTS ENDPOINTS
// (1) GET /api/posts - Returns an array of all the post objects contained in the database

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The posts information could not be retrieved',
            });
        });
});

// (2) GET /api/posts/:id - Returns the post object with the specified id

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The post information could not be retrieved',
            });
        });
});

// (6) GET /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The comments information could not be retrieved',
            });

        });
});

// (3) POST /api/posts - Creates a post using the information sent inside the request body and returns the newly created post object

router.post('/', (req, res) => {
    const newPost = req.body
    // const newPostCopy = { ...newPost }
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {

        Posts.insert(newPost)
            .then(post => {
                // console.log(post, "line 74 post-router.js")
                res.status(201).json({ id: post.id, title: newPost.title, contents: newPost.contents });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'There was an error while saving the post to the database',
                });
            });
    }
});

// (5) DELETE /api/posts/:id - Removes the post with the specified id and returns the deleted post object



router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedPost = await Posts.findById(id)

    await Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json(deletedPost);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The post could not be removed',
            });
        });
});


// (4) PUT /api/posts/:id - Updates the post with the specified id using data from the request body and returns the modified document, not the original

router.put('/:id', (req, res) => {
    const updatedPost = req.body;
    const resObject = { id: Number(req.params.id), title: updatedPost.title, contents: updatedPost.contents };
    if (!updatedPost.title || !updatedPost.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {

        Posts.update(req.params.id, updatedPost)
            .then(updatedPost => {
                if (updatedPost) {
                    // console.log(updatedPost, "this from line 117 of posts-router.js")
                    res.status(200).json(resObject);
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'The post information could not be modified',
                });
            });
    }
});

module.exports = router