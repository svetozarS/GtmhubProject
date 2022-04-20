// ---> Showing the username and password of the new account <---
const infoBtn = document.querySelector('.links i');
const popup = document.querySelector('.popup-wrapper');
const closeButton = document.querySelector('.popup-close');

infoBtn.addEventListener('click', () => {
    popup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

popup.addEventListener('click', () => {
    popup.style.display = 'none';
});


// ---> Migrate all users with DOM <---
const migarateUsersBtn = document.querySelector('#migarateUsersBtn');

migarateUsersBtn.addEventListener('click', () => {
    getUsers();
    console.log('Well done! You successfuly migrate all the Users 😄');
});


// ---> Migrate all sessions with DOM <---
const migarateSessionBtn = document.querySelector('#migarateSessionBtn');

migarateSessionBtn.addEventListener('click', () => {
    getSessons();
    console.log('Well done! You successfuly migrate all the Sessions 😄');
});


// ---> Migrate all OKRs with DOM <---
const migarateOKRsBtn = document.querySelector('#migarateOKRsBtn');

migarateOKRsBtn.addEventListener('click', () => {
    getSessions()
    console.log('Well done! You successfuly migrate all the OKRs 😄');
});
