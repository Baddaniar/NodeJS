const usersLists = document.querySelector(".users_list")

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

//Загрузка данных и жестокий костыль Подправить позже загрузку юзеров которых мы фоловим
const loadUsersData = async () => {
    const userId = "63c2d998a2f87529a1937ebd";
    const followedUsers = ["63c2d9b8a2f87529a1937ebf", "63c2d9dae4708b45fb777356"]
    const result = await fetchData(`/users`);
    let usersWithoutCurrent = result.filter((user) => user._id !==userId
    )
    usersWithoutCurrent.forEach(user => {
        if(followedUsers.includes(user._id)){
            usersLists.innerHTML += `
            <div class="users_one">
                <p>${user.fullName}</p>
                <p>${user.aboutAuthor}</p>
                <button onclick="unfollowUser('${user._id}')">Отписаться</button>
            </div>
            `
        }else{
            usersLists.innerHTML += `
            <div class="users_one">
                <p>${user.fullName}</p>
                <p>${user.aboutAuthor}</p>
                <button onclick="followUser('${user._id}')">Подписаться</button>
            </div>
            `
        }
    });
}
//Тут нужно добавить обновление после того как он подпишется или отпишется
const followUser = (followedUserId) => {
    const userId = "63c2d998a2f87529a1937ebd";
    const payload = {
        userId: userId,
        followedUserId: followedUserId
    }
    const jsonPayload = JSON.stringify(payload)
    postData("/users/followUser", jsonPayload)
}

const unfollowUser = (followedUserId) => {
    const userId = "63c2d998a2f87529a1937ebd";
    const payload = {
        userId: userId,
        followedUserId: followedUserId
    }
    const jsonPayload = JSON.stringify(payload)
    postData("/users/unfollowUser", jsonPayload)
}


loadUsersData()