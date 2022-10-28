const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn')
const postID = document.getElementById('post-id').value;
console.log(postID)
const updatePost = async function (event) {
    event.preventDefault();

    const titleEl = document.getElementById('postTitle');
    const textEl = document.getElementById('postText');

    await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({
            titleEl,
            textEl,
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