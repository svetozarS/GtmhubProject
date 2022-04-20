// ---> POST a session <---
const postSession = async (data) => {
    const rawResponse = await fetch('https://app.gtmhub.com/api/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gtmhub-accountId': newGtmhubAccountId,
            'Authorization': 'Bearer ' + newBearerTokenAccount
        },
        body: JSON.stringify(data)    
    });
    
    return await rawResponse.json();
};

// ---> GET all Sessons <---
const getSessons = () => {  
    fetch(`${url}sessions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gtmhub-accountId': oldGtmhubAccountId,
            'Authorization': 'Bearer ' + oldBearerTokenAccount
        }
    })
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);
            const arr = values[0];
            arr.forEach(obj => {
                postSession(obj);
            });

        })
        .catch(err => console.log('rejected', err.message));
}

