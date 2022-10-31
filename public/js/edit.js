const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn')
const postID = document.getElementById('post-id').value;
console.log(postID)
const updatePost = async function (event) {
    event.preventDefault();

    const post_title = document.getElementById('postTitle').value;
    const post_text = document.getElementById('postText').value;

    await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    document.location.replace('/dashboard')
};

const deletePost = async function () {
    await fetch(`/api/post/${postID}`, {
        method: 'DELETE'
    });
    document.location.replace('/dashboard')
}

updateBtn.addEventListener('click', updatePost);
deleteBtn.addEventListener('click', deletePost);