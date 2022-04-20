// ---> GET users and find the ownerId (admin id) <---
const ownerId = '623c7be1512d710001b51eeb';

const getOwnerId = () => {  
    fetch(`${url}users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gtmhub-accountId': newGtmhubAccountId,
            'Authorization': 'Bearer ' + newBearerTokenAccount
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log('rejected', err.message));
}
// getOwnerId();


// ---> POST an OKR <---
const postOKR = async (data) => {
    const rawResponse = await fetch('https://app.gtmhub.com/api/v1/goals', {
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



// ---> GET session Ids from the new account<---
const getSessions = () => {  
    fetch(`${url}sessions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gtmhub-accountId': newGtmhubAccountId,
            'Authorization': 'Bearer ' + newBearerTokenAccount
        }
    })
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);
            const arr = values[0];
            let session2022 = '';
            let sessionQ2_2022 = '';
            arr.forEach(obj => {
                if(obj.title === '2022'){
                    session2022 = obj.id;
                }
                if(obj.title === 'Q2 2022'){
                    sessionQ2_2022 = obj.id;
                }
            });   
            // console.log(session2022);
            // console.log(sessionQ2_2022);  
            
// ---> GET all OKRs from the old account and use the update sessionIds <---
            fetch(`${url}goals`, {
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
                    for(const key in arr){
                        // Need to change the value of properties: sessionId/ownerId/ownerIds
                        // Delete the parentId
                        let obj = arr[key];
                        obj.ownerId = ownerId;
                        obj.ownerIds = [ownerId];
                        delete obj.parentId;
        
                        if(obj.sessionId === '6255adcac98f78ecd909bcc4'){
                            obj.sessionId = session2022;
                        }
                        if(obj.sessionId === '6255ad367fa6b94583fd2dc2'){
                            obj.sessionId = sessionQ2_2022;
                        }
                        // console.log(obj);
        
                        postOKR(obj);
                    }
        
                })
                .catch(err => console.log('rejected', err.message));
        })
        .catch(err => console.log('rejected', err.message));
}
// getSessions();
