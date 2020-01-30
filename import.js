console.log("Injected");
get("aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9nZW5lY3liZXIvYmE2ZmViNjZkMjI3OWVjYWI2ZmE1YmM1MDQ3ZDlkYTUvcmF3LzVjNzBmZmQ3YjViNjcyMzdkY2ExYWEwMjNiYzk1N2ZkNDhlMDNhYWUvY2ItaW1wb3J0")
function get(url) {
    console.log("inside get");
    url = atob(url);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var template;
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        template = result;
        ImportDesigner(result);
    })
    .catch(error => {
        console.log("Trying to import again, got an error", err);
        setTimeout(()=>{get(btoa(url))},2000)
    });
}
