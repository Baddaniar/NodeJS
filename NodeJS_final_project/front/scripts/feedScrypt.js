const postsFeed = document.querySelector(".posts_feed_block")

const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};

const postData = async (route, payload) => {
    fetch(
        BASE_URL + route, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload,
        },
    )
    .then(() => console.log("parsed"))
    .catch(() => console.log("Error sending request"));
};

//Загрузка постов всех кроме автора
const loadAllPosts = async () => {
    const userId = "63c2e910ed162a1645f4ea48";
    postsFeed.innerHTML = ""
    const result = await fetchData("/posts");
    const postsWithoutCurrent = result.filter((user) => user._id !== userId)
    postsWithoutCurrent.forEach(post => {
        postsFeed.innerHTML += `
        <div class="post_block">
            <p>${post.postHeader}</p>
            <p>${post.postData}</p>
            <p>Likes: ${post.likesAmount}</p>
            <input type="button" value="Like" onclick="likePost('${post._id}')">
            <input type="button" value="unLike" onclick="unlikePost('${post._id}')">
        </div>
        `
    });
}

const likePost = async (postId) =>{
    await fetch(BASE_URL + `/posts/like/${postId}`);
    loadAllPosts()

}

const unlikePost = async (postId) =>{
    await fetch(BASE_URL + `/posts/unlike/${postId}`);
    loadAllPosts()
}

loadAllPosts()