skillshare.addEventListener("click", async () => {
    chrome.cookies.getAll( {}, getTab)
});


const getTab = (cookies)  => {
    const cookie = cookies.find(cookie => cookie.name === "skillshare_user_")
    console.log(cookie)
    let _ = cookie ? showDivSession() : goToTab()
}

const showDivSession = () => {
    const div = document.getElementById("skillSession")
    div.style.display = "block"
}
const goToTab = () => {
    chrome.tabs.query({},(tabs) => {
        const tab = tabs.reduce((acc, tab) => { 
            if (tab.url.includes('skillshare'))
                acc = tab
            return acc
        }, false)
        openTab(tab)
    })
}
const openTab = (tab) => {
    let _ = tab ? chrome.tabs.update(tab.id, {selected: true}) :  chrome.tabs.create({url: "https://www.skillshare.com"})
}

const makeRequest = () => {
    const id = document.getElementById("idClass").value
    fetch('https://api.skillshare.com/classes/' + id).then(r => r.json()).then(result => {
        const { sessions } = result._embedded.sessions._embedded
        let hashes = sessions.map(video => video.video_hashed_id.replace("bc:", ""))
        const container = document.getElementById("skillSession")
        container.style.display = "none"
        const div = document.getElementById("hashes")
        div.innerText = JSON.stringify(hashes)
        // div.innerText = JSON.stringify(result)
    })
}

getIds.addEventListener("click", makeRequest)