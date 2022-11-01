const submitBtn = document.getElementById('submitPost');
const user_id = document.getElementById('user-id').value;
console.log(user_id)
const submitPostHandler = async function () {
    console.log('makign a post');

    const post_title = document.getElementById('newPostTitle').value;
    const post_text = document.getElementById('newPostContent').value

    // const response = 
    await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_text,
            user_id
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    console.log('posting')

    document.location.replace('/dashboard')
}

submitBtn.addEventListener('click', submitPostHandler)