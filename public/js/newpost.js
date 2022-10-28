const submitBtn = document.getElementById('submitPost');

const submitPostHandler = async function () {
    console.log('makign a post');

    const titleEl = document.getElementById('newPostTitle');
    const textEl = document.getElementById('newPostContent')

    // const response = 
    await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            post_title: titleEl.value,
            post_text: textEl.value,
        }),
        header: { 'Content-Type': 'application/json' }
    })
    console.log('posting')

    document.location.replace('/dashboard')

    // if (response.ok) {
    //     document.location.replace('/dashboard')
    // } else {
    //     alert('failed to post')
    // }
}

submitBtn.addEventListener('click', submitPostHandler)