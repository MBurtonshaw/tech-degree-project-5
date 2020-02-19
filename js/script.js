const randomUser = "https://randomuser.me/api/";

async function fetchData(url) {
    try {
        for (let i = 0; i < 12; i++) {
            const response = await fetch(url);
            const data = await response.json();
            console.log([data]);
        }
    } catch (error) {
        throw error;
    }
}

fetchData(randomUser);
