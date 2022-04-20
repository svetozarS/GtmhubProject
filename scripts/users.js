const oldBearerTokenAccount = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2d0bWh1Yi5jb20vYXBwX21ldGFkYXRhL2FjY291bnRJZCI6IjYyNTVhZDM2N2ZhNmI5NDU4M2ZkMmRiZiIsImlhdCI6MTY0OTc4MjA3MSwic3ViIjoiYXV0aDB8NjI1NWFkMzRhMWU0MTEwMDZmZjg0NGU3In0.JINpdqRDuz14SVbbdtY1CcVJxthqFxWWDFA0QTzUGWw';
const newBearerTokenAccount = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2d0bWh1Yi5jb20vYXBwX21ldGFkYXRhL2FjY291bnRJZCI6IjYyM2M3YmUxMjFjODAwZmQ5NDliZDFjNCIsImlhdCI6MTY0ODEzMTA0Miwic3ViIjoiYXV0aDB8NjIzYzdiZGYzNGZiYjMwMDZhM2U1ZDZkIn0.DiXFCPBosv45UFZxhGTjD-lYYO5akdAJfWt_lpGHbMo';
const url = 'https://app.gtmhub.com/api/v2/';
const oldGtmhubAccountId = '6255ad367fa6b94583fd2dbf';
const newGtmhubAccountId = '623c7be121c800fd949bd1c4';

// ----> POST an user <-----
const postUser = async (data) => {
    const rawResponse = await fetch('https://app.gtmhub.com/api/v1/users', {
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

// ----> GET the allUsers in old account <----
const getUsers = () => {  
    fetch(`${url}users`, {
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
                let obj = arr[key];

                if(obj.email === 'svetozar.s.stanchev@gmail.com'){
                    console.log(`User with email: ${obj.email} already exist`);
                    continue;        
                }

                if(obj.subscriptionType === 'unchargeable'){
                    obj.subscriptionType = 'regular';
                    postUser(obj);
                } else {
                    postUser(obj);
                } 

            }
        })
        .catch(err => console.log('rejected', err.message));
}
// getUsers();




// ---> GET singleUser <---
const singleUser = (userId) => {

    fetch(`https://app.gtmhub.com/api/v1/users/${userId}`, {
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
            console.log(data);
        })
        .catch(err => console.log('rejected', err.message));

};
//user1Id: 
// singleUser('6255ad367fa6b94583fd2dc0');

// user2Id: 
// singleUser('6255ad72c98f78ecd909bcc1');

// user3Id: 
// singleUser('6255ad89f4ceef9876630f8c');

// user4Id: 
// singleUser('6255ad89f4ceef9876630f8d');

// user5Id: 
// singleUser('6255ad97f4ceef9876630f91');

// user6Id: 
// singleUser('6255ada17fa6b94583fd2ddc');

// user7Id: 
// singleUser('6255c6a1f4ceef9876630fe7');


