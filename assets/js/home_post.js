
    // Method to submit the form data for new post using AJAX
    let createPost= function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'POST',
                url:'/posts/create-post',
                data: newPostForm.serialize(),
                success:async function(data){
                    console.log("aa",data.data.post);
                    let populatedPost = await populateUserDetails(data.data.post);
                    let newPost= newPostDom(populatedPost);
                    $('#feed>ul').prepend(newPost);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    let populateUserDetails = async function (post) {
        try {
            // Assuming there's an endpoint to get user details based on the user ID

            const userData = await $.ajax({
                type: 'GET',
                url: `/users/get-user?id=${post.user}`,
            });
    
            post.user = userData; // Update the 'user' object in the post with user details
            return post;

            // const userData = await users.findById(post.user);
    
            // post.user = userData; // Replace the 'user' object in the post with user details
            // return post;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return post; // Return the original post object if there's an error
        }
    }

    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`
            <li id="post-${post._id}">
                <div id="post">
                    <div id="users_name">
                        <h5> ${ post.user.name } </h5>
                    </div>
                    <div id="content">
                        <h3> ${ post.content } </h3>
                        <div id="post-image">
                            <img src="${ post.image }" alt="" height="400px">
                        </div>
                    </div>
                    <br>
                    <div id="like-comment">
                        <div id="like-button">
                            <a href=""> <i class="fa-regular fa-heart"></i> </a>
                        </div>
                        <div id="comment">
                                <form action="/comments/create-comment/?id=${ post._id }" method="POST">
                                    <textarea name="content" id="comment-textarea" cols="20" rows="1"></textarea>
                                    <button type="submit">
                                        <i class="fa-regular fa-comment"></i>
                                    </button>
                                </form>
                        </div>
                        <div>
                            <div id="post-delete-button">
                                    <a id="delete-post-button" href="/posts/delete-post/?id=${ post._id }">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `);
    }

    createPost();


