const spawnInput = document.getElementById('newCommentBtn')
const commentContainerEl = document.getElementById("commentContainer")
const submitcommentBtn = document.getElementById('submitComment')
const post_id = document.getElementById("postID").dataset.postid;
const user_id = document.getElementById('newCommentBtn').dataset.userid
spawnInput.addEventListener('click', function () {
    console.log("clicking button")
    commentContainerEl.style.display = "block"
})

const addComment = async function () {
    const comment_text = document.querySelector("#newComment").value.trim();
    await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
            comment_text, user_id, post_id

        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    document.location.reload();
};

submitcommentBtn.addEventListener('click', addComment)