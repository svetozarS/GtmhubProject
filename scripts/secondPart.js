// ---> Reference to HTML elements <---
const firstSession = document.querySelector('.first-session');
const secondSession = document.querySelector('.second-session');

const firstOKR = document.querySelector('.first-OKR');
const secondOKR = document.querySelector('.second-OKR');
const thirdOKR = document.querySelector('.third-OKR');

const firstList = document.querySelector('.list-first-OKR');
const secondList = document.querySelector('.list-second-OKR');
const thirdList = document.querySelector('.list-third-OKR');

const counterTaskFirst = document.querySelector('.counterTask-first');
const counterTaskSecond = document.querySelector('.counterTask-second');
const counterTaskThird = document.querySelector('.counterTask-third');

const totalTasks = document.querySelector('.third-part');

// ---> GET sessionIds and adding them to the HTML <---
const session2022 = '6255adcac98f78ecd909bcc4';
const sessionQ2_2022 = '6255ad367fa6b94583fd2dc2';

const getSessionIds = () => {  
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

                // adding the sessions in the HTML:
                if(obj.id === session2022){
                    firstSession.innerHTML += `<p> <i class="fa-solid fa-arrow-right-long"></i> Session <span>${obj.title}</span> :</p>`;
                }
                if(obj.id === sessionQ2_2022){
                    secondSession.innerHTML += `<p> <i class="fa-solid fa-arrow-right-long"></i> Session <span>${obj.title}</span> :</p>`;
                }
           });
        })
        .catch(err => console.log('rejected', err.message));
}
getSessionIds();


// ---> GET OKRIds/OKRNames and adding the sessions to HTML <---
const DevelopTheBestWebApp = '6255c271c953fa0001a094ed';
const devName = 'Develop the best web app';
const PutItOnTheMarket = '6255c3725146470001c42253';
const putName = 'Put it on the market';
const RockTheMarket = '6255c42053e7e0000157925c';
const rockName = 'Rock the market';

const getOKRIds = () => {  

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
            arr.forEach(obj => {
                // console.log(obj);

                // adding the OKRs in the HTML:
                if(obj.name === devName){
                    firstOKR.innerHTML += `<div> <i class="fa-solid fa-circle"></i> ${obj.name}</div>`;                    
                }
                if(obj.name === putName){                   
                    secondOKR.innerHTML += `<div> <i class="fa-solid fa-circle"></i> ${obj.name}</div>`;                    
                }
                if(obj.name === rockName){                   
                    thirdOKR.innerHTML += `<div> <i class="fa-solid fa-circle"></i> ${obj.name}</div>`;                    
                }
                
           });
        })
        .catch(err => console.log('rejected', err.message));
}
getOKRIds();


// ---> GET KRNames <---
const getKRsNames = () => {  

    // Arrays for all KRs + the OKR
    let devArr = [];
    devArr.push(devName);
    let putArr = [];
    putArr.push(putName);
    let rockArr = [];
    rockArr.push(rockName);


    fetch(`${url}metrics`, {
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
                // console.log(obj.name);

                // Adding the KRs to array and add them to the HTML
                if(obj.goalId === DevelopTheBestWebApp){
                    devArr.push(obj.name);
                    firstList.innerHTML += `<p> <i class="fa-solid fa-arrow-trend-up"></i> ${obj.name}</p>`;
                } else if(obj.goalId === PutItOnTheMarket){
                    putArr.push(obj.name);
                    secondList.innerHTML += `<p> <i class="fa-solid fa-arrow-trend-up"></i> ${obj.name}</p>`;
                } else if(obj.goalId === RockTheMarket){
                    rockArr.push(obj.name);
                    thirdList.innerHTML += `<p> <i class="fa-solid fa-arrow-trend-up"></i> ${obj.name}</p>`;
                }
            });
            // console.log(devArr);
            // console.log(putArr);
            // console.log(rockArr);

// ---> GET Tasks <---
            fetch(`${url}tasks`, {
                
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

                    // Count how many tasks are in the OKR
                    let tasksInDev = 0;
                    let tasksInRock = 0;
                    let tasksInPut = 0;

                    const values = Object.values(data);
                    const arr = values[0];
                    arr.forEach(obj => {
                        // console.log(obj);

                        // Check for mach:
                        devArr.forEach(name => {
                            if(name === obj.parentName){
                                tasksInDev++;
                            }
                        });
                        putArr.forEach(name => {
                            if(name === obj.parentName){
                                tasksInRock++;
                            }
                        });
                        rockArr.forEach(name => {
                            if(name === obj.parentName){
                                tasksInPut++;
                            }
                        });
                    });

                    let sumTotalTasks = tasksInDev + tasksInRock + tasksInPut;
                    // console.log(sumTotalTasks);

                    // console.log(tasksInDev);
                    // console.log(tasksInRock);
                    // console.log(tasksInPut);

                    // Adding the Task count in HTML
                    counterTaskFirst.innerHTML = `<p> <i class="fa-solid fa-sun"></i> Tasks in this OKR: ${tasksInDev}</p>`
                    counterTaskSecond.innerHTML = `<p> <i class="fa-solid fa-sun"></i> Tasks in this OKR: ${tasksInRock}</p>`
                    counterTaskThird.innerHTML = `<p> <i class="fa-solid fa-sun"></i> Tasks in this OKR: ${tasksInPut}</p>`

                    totalTasks.innerHTML = `<p> <i class="fa-solid fa-sun"></i> Total Tasks in all OKRs: ${sumTotalTasks}</p>`

                })
                .catch(err => console.log('rejected', err.message));
        })
        .catch(err => console.log('rejected', err.message));

}
getKRsNames();

