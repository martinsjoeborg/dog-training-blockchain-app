import dogGym from "./dogGym.js";

export default function walletView () {
    const content = document.getElementById("content");
    const blockArray = JSON.parse(localStorage.getItem("blockchainObjectArr"));
    let userId = localStorage.getItem("userId");

    if (!isNaN(userId)) {
        userId = userId.toString();
    }
    const walletDiv = document.createElement("div");
    walletDiv.id = "cardDiv";

    let ownedDogs = [];
    blockArray.timeSheet.map((block) => {
        if(block.data.dogsOwner === userId) {
            // leta efter dubletter och lagg bara till det med hogsta index     
            ownedDogs.push(block);
        }
    });

    // Array med alla ID i owned dogs
    let ownedDogsIdArray = [];
    ownedDogs.map((block) => {
        ownedDogsIdArray.push(block.data.id);
    });

    // Hittar dubletter och lagger ID med dubletter i array
    const toFindDuplicates = ownedDogsIdArray => ownedDogsIdArray.filter((item, index) => ownedDogsIdArray.indexOf(item) !== index)
    const duplicateElements = toFindDuplicates(ownedDogsIdArray);

    // mappar genom alla ID (kanske bara ska mappa dublettID)
    duplicateElements.map((id) => {
        let dogsWithId = [];
        // Hittar alla hundar med dublett ID
        ownedDogs.map((dog) => {
            if (dog.data.id === id) {
                //hundar med ID
                dogsWithId.push(dog);
            }
        });
        dogsWithId.pop(); // poppar bort hunden vi vill behalla 
        // ta bort hundar fran Owned dogs med samma Index som dogsWithID
        dogsWithId.map((dog) => {
            let dogIndex = dog.index;
            let duplicateDog = ownedDogs.find(x => x.index === dogIndex);
            let indexInOwnedDogs = ownedDogs.indexOf(duplicateDog);
            if (indexInOwnedDogs > -1) {
                ownedDogs.splice(indexInOwnedDogs, 1);
            }
        });
    });
    
    for (let i = 0; i < ownedDogs.length; i++) {
        var dogDiv = document.createElement("div");
        dogDiv.id = `dogDiv${i}`;
        dogDiv.className += "dogDiv";

        dogDiv.innerHTML = 
        `<div id="dogImageBox"><img id = "doggyImage" src="${ownedDogs[i].data.dogImage}" alt="din hund"></div>
        <div id = "dogCardContainer">
        <h2 id = "dogWalletName">${ownedDogs[i].data.dogName}</h2> 
        <h4 id = "dogWalletXP">XP: ${ownedDogs[i].data.dogXP}</h4> 
        <p id = "dogWalletState">Dog State: ${ownedDogs[i].data.dogState}</p> </div>` ;

        const gymButton = document.createElement("button");
        gymButton.id = `gymBtn${i}`;
        if (ownedDogs[i].data.dogState == "With owner") {
            gymButton.innerHTML = "Send to gym!";
            gymButton.addEventListener('click', () => {
                dogGym(ownedDogs[i].data); 
                walletView();
            });
        } else {
            gymButton.innerHTML = "Send home!";
            gymButton.addEventListener('click', () => {
                dogGym(ownedDogs[i].data);
                walletView(); 
            });
        }

        dogDiv.appendChild(gymButton);

        walletDiv.appendChild(dogDiv);
    }
    content.innerHTML = "";
    content.appendChild(walletDiv);
    



}