const authorFullName = document.querySelector("#author_fullName");
const authorAboutField = document.querySelector("#author_about_field");
const authorPostsBlock = document.querySelector(".author_posts_block");

const createPostHeader = document.querySelector("#create_post_header");
const createPostData = document.querySelector("#create_post_data");
const createPostBtn = document.querySelector("#create_post_btn");

const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const postData = async (route, payload) => {
    fetch(BASE_URL + route, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: payload,
    })
        .then(() => console.log("parsed"))
        .catch(() => console.log("Error sending request"));
};

//Вывод информации о профиле
const fetchProfileData = async () => {
    const userId = "63c2d998a2f87529a1937ebd";
    const result = await fetchData(`/users/${userId}`);
    authorFullName.value = result.fullName;
    authorAboutField.innerHTML = result.aboutAuthor;
};

//Вывод постов пользователя
const fetchUsersPosts = async () => {
    const userId = "63c2d998a2f87529a1937ebd";
    authorPostsBlock.innerHTML = "";
    const result = await fetchData(`/posts/${userId}`);
    console.log(result);
    result.forEach((post) => {
        authorPostsBlock.innerHTML += `
        <div class="post_block">
            <p>${post.postHeader}</p>
            <p>${post.postData}</p>
            <p>Likes: ${post.likesAmount}</p>
            <input type="button" value="delete" onclick="deletePost('${post._id}')">
            <input type="button" value="update">
        </div>
        `;
    });
};

//Удаление поста
const deletePost = (postId) => {
    fetch("http://localhost:8080/posts/" + postId, {
        method: "delete",
    })
        .then(() => console.log("post deleted"))
        .catch(() => console.log("Error deleting post"));
    setTimeout(() => fetchUsersPosts(), 1000);
};

//Создание поста
const CreatePost = () => {
    const userId = "63c2d998a2f87529a1937ebd";
    const payload = {
        author: userId,
        postHeader: createPostHeader.value,
        postData: createPostData.value,
    };
    const jsonPayload = JSON.stringify(payload);

    postData("/posts", jsonPayload);

    createPostHeader.value = "";
    createPostData.value = "";
    setTimeout(()=> fetchUsersPosts(), 1000);
};


createPostBtn.addEventListener("click", CreatePost);
fetchUsersPosts();
fetchProfileData();
