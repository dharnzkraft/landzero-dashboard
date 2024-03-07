const firebaseConfig = {
    apiKey: "AIzaSyDv9prflm4k3yT5fJOqPqOCc9H0Y1lkrms",
    authDomain: "landzerodb.firebaseapp.com",
    projectId: "landzerodb",
    storageBucket: "landzerodb.appspot.com",
    messagingSenderId: "784184902788",
    appId: "1:784184902788:web:04cef0d11f8c0f21b5eed1",
    measurementId: "G-JQB48KQMGW",
    databaseURL: "https://landzerodb-default-rtdb.firebaseio.com",
  
};

firebase.initializeApp(firebaseConfig);

var landzeroDb = firebase.database().ref("landzeroDB");
var siteTitles = firebase.database().ref("siteTitles");
var propertListings = firebase.database().ref("propertyListings");
var testimonies = firebase.database().ref("testimonies");
var propertydb = firebase.database().ref("properties")



document.getElementById("logoForm").addEventListener("submit", updateLogo);
document.getElementById("darkLogoForm").addEventListener("submit", updateLogo2);
document.getElementById("siteTitleForm").addEventListener("submit", addSiteTitle);
document.getElementById("listingForm").addEventListener("submit", addPropertyList);
document.getElementById("testimonyForm").addEventListener("submit", addTestimony)
// document.getElementById("propertyForm").addEventListener("submit", addProperty)

function updateLogo(e) {
    e.preventDefault();
    var logoUrl = getElementValue("logo1");
  
    saveLogoUrl(logoUrl);
    setTimeout(() => {
      showAlert();
    }, 2000);
    document.getElementById("logoForm").reset();
    // window.location.reload()
}

function updateLogo2(e) {
  e.preventDefault();
  var logoUrl = getElementValue("logo");

  saveDarkLogo(logoUrl);
  setTimeout(() => {
    showAlert();
  }, 2000);
  document.getElementById("darkLogoForm").reset();
  // window.location.reload()
}

function addSiteTitle(e){
    e.preventDefault();
    var body = {
        title: getElementValue('title'),
        subtitle: getElementValue("subtitle"),
        image: getElementValue('image')
    }
    addNewSiteTitle(body)
    setTimeout(() => {
        showAlert();
      }, 2000);
    document.getElementById("siteTitleForm").reset();
}

function addPropertyList(e) {
    e.preventDefault();
    var body = {
        propertyName: getElementValue('propertyName'),
        propertyPrice: getElementValue("propertyPrice"),
        imageUrl: getElementValue('imageUrl'),
        locationDetails: getElementValue('locationDetails')
    }

    addNewListing(body)
    setTimeout(() => {
        showAlert();
      }, 2000);
    document.getElementById("listingForm").reset();
}

function addTestimony(e){
    e.preventDefault();
    var body = {
        recipientName: getElementValue('recipientName'),
        testimony: getElementValue('testimony'),
        title: getElementValue('testimonyTitle')
    }
    addNewTestimony(body)
    setTimeout(() => {
        showAlert();
      }, 2000);
    document.getElementById("testimonyForm").reset();
}

function addProperty(e){
    e.preventDefault();
    var body = {
        propertyName: getElementValue('newPropertyName'),
        newPropertyPrice: getElementValue("newPropertyPrice"),
        imageUrl: getElementValue('propertyImageUrl')
    }
    addNewProperty(body)
    setTimeout(() => {
        showAlert();
      }, 2000);
    document.getElementById("propertyForm").reset();
}

// functions to fetch data


landzeroDb.on('value',(snapshot)=>{
    var data = snapshot.val()
    console.log(data)
    displaydarkLogo(data)
})

siteTitles.once('value')
.then(function(snapshot){
    var siteTitles = snapshot.val()
    displayTitles(siteTitles)
})

propertListings.once('value')
.then(function(snapshot){
    var propertyListing = snapshot.val()
    displayProperties(propertyListing)
})

testimonies.once('value')
.then(function(snapshot){
    var testimonies = snapshot.val()
    displayTestimonies(testimonies)
})

propertydb.once('value')
.then(function(snapshot){
    var properties = snapshot.val()
    console.log(properties, 'properties')
    displayProp(properties)
})

// properties
function displayProp(properties){
    var tableBody = document.querySelector('#propertyTable tbody');

    // Iterate through each user object
    for (var userId in properties) {
        if (properties.hasOwnProperty(userId)) {
          var title = properties[userId];
          var row = tableBody.insertRow(); // Insert a new row

          // Insert cells for name and email
          var testimonyCell = row.insertCell();
          var nameCell = row.insertCell();
          var actionCell = row.insertCell();

          // Populate cells with user data
          testimonyCell.textContent = title.propertyName;
          nameCell.textContent = title.newPropertyPrice;

          // Create delete button
          var deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'btn btn-danger delete-btn';
          deleteBtn.addEventListener('click', function() {
            // Call delete function passing the userId
            var userId = this.dataset.userId;
            deleteProperty(userId);
          });
          deleteBtn.dataset.userId = userId; // Store userId in dataset for later use
          actionCell.appendChild(deleteBtn); 
        }
      }
}

function deleteProperty(userId) {
    // Remove the user from the database
    firebase.database().ref('properties/' + userId).remove()
      .then(function() {
        console.log('User data deleted successfully!');
        // Remove the corresponding row from the table
        var row = document.querySelector('button[data-user-id="' + userId + '"]').parentNode.parentNode;
        row.parentNode.removeChild(row);
      })
      .catch(function(error) {
        console.error('Error deleting user data:', error);
      });
  }


// testimonies
function displayTestimonies(testimonies){
    var tableBody = document.querySelector('#testimonyTable tbody');

    // Iterate through each user object
    for (var userId in testimonies) {
        if (testimonies.hasOwnProperty(userId)) {
          var title = testimonies[userId];
          var row = tableBody.insertRow(); // Insert a new row

          // Insert cells for name and email
          var testimonyCell = row.insertCell();
          var nameCell = row.insertCell();
          var actionCell = row.insertCell();

          // Populate cells with user data
          testimonyCell.textContent = title.testimony;
          nameCell.textContent = title.recipientName;

          // Create delete button
          var deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'btn btn-danger delete-btn';
          deleteBtn.addEventListener('click', function() {
            // Call delete function passing the userId
            var userId = this.dataset.userId;
            deleteTestimony(userId);
          });
          deleteBtn.dataset.userId = userId; // Store userId in dataset for later use
          actionCell.appendChild(deleteBtn); 
        }
      }
}

function deleteTestimony(userId) {
    // Remove the user from the database
    firebase.database().ref('testimonies/' + userId).remove()
      .then(function() {
        console.log('User data deleted successfully!');
        // Remove the corresponding row from the table
        var row = document.querySelector('button[data-user-id="' + userId + '"]').parentNode.parentNode;
        row.parentNode.removeChild(row);
      })
      .catch(function(error) {
        console.error('Error deleting user data:', error);
      });
  }

// properties feature listings

function displayProperties(propertyListing){
    var tableBody = document.querySelector('#propertyTable tbody');

    // Iterate through each user object
    for (var userId in propertyListing) {
        if (propertyListing.hasOwnProperty(userId)) {
          var title = propertyListing[userId];
          var row = tableBody.insertRow(); // Insert a new row

          // Insert cells for name and email
          var titleCell = row.insertCell();
          var priceCell = row.insertCell();
          var actionCell = row.insertCell();

          // Populate cells with user data
          titleCell.textContent = title.propertyName;
          priceCell.textContent = title.propertyPrice;

          // Create delete button
          var deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'btn btn-danger delete-btn';
          deleteBtn.addEventListener('click', function() {
            // Call delete function passing the userId
            var userId = this.dataset.userId;
            deleteListing(userId);
          });
          deleteBtn.dataset.userId = userId; // Store userId in dataset for later use
          actionCell.appendChild(deleteBtn); 
        }
      }
}

function deleteListing(userId) {
    // Remove the user from the database
    firebase.database().ref('propertListings/' + userId).remove()
      .then(function() {
        console.log('User data deleted successfully!');
        // Remove the corresponding row from the table
        var row = document.querySelector('button[data-user-id="' + userId + '"]').parentNode.parentNode;
        row.parentNode.removeChild(row);
      })
      .catch(function(error) {
        console.error('Error deleting user data:', error);
      });
  }

// titles
function displayTitles(siteTitleList){
    var tableBody = document.querySelector('#titleTable tbody');

    // Iterate through each user object
    for (var userId in siteTitleList) {
        if (siteTitleList.hasOwnProperty(userId)) {
          var title = siteTitleList[userId];
          var row = tableBody.insertRow(); // Insert a new row

          // Insert cells for name and email
          var nameCell = row.insertCell();
          var emailCell = row.insertCell();
          var actionCell = row.insertCell();

          // Populate cells with user data
          nameCell.textContent = title.title;
          emailCell.textContent = title.subtitle;

          // Create delete button
          var deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'btn btn-danger delete-btn';
          deleteBtn.addEventListener('click', function() {
            // Call delete function passing the userId
            var userId = this.dataset.userId;
            deleteUserData(userId);
          });
          deleteBtn.dataset.userId = userId; // Store userId in dataset for later use
          actionCell.appendChild(deleteBtn); 
        }
      }
}

// Function to delete user data from Firebase
function deleteUserData(userId) {
    // Remove the user from the database
    firebase.database().ref('siteTitles/' + userId).remove()
      .then(function() {
        console.log('User data deleted successfully!');
        // Remove the corresponding row from the table
        var row = document.querySelector('button[data-user-id="' + userId + '"]').parentNode.parentNode;
        row.parentNode.removeChild(row);
      })
      .catch(function(error) {
        console.error('Error deleting user data:', error);
      });
  }

function displaydarkLogo(imageUrl){

    // display dark logo
    var imageContainer = document.getElementById('imageContainer');
    var imgElement = document.createElement('img');
    imgElement.src = imageUrl.darkLogoUrl;
    imgElement.width = "300"
    imageContainer.appendChild(imgElement);

    // display light logo
    var imageContainer2 = document.getElementById('imageContainer2');
    var imgElement2 = document.createElement('img');
    imgElement2.src = imageUrl.whiteLogoUrl;
    imgElement2.width = "300"
    imageContainer2.appendChild(imgElement2);
}


    



const saveLogoUrl = (logoUrl) => {
  landzeroDb.update({ whiteLogoUrl: logoUrl });
};

const saveDarkLogo = (logoUrl) => {
    landzeroDb.update({ darkLogoUrl: logoUrl });
}

const addNewSiteTitle = (body) => {
    siteTitles.push( body );
};

const addNewListing = (body) => {
    propertListings.push( body );
};

const addNewTestimony = (body) =>{
    testimonies.push(body);
}

const addNewProperty = (body) => {
    propertydb.push(body);
}

const getElementValue = (id) => {
  return document.getElementById(id).value;
};



function showAlert() {
  toastr.success("Action was successful!!!", "Update successful", {
    positionClass: "toast-bottom-left",
    timeOut: 5e3,
    closeButton: !0,
    debug: !1,
    newestOnTop: !0,
    progressBar: !0,
    preventDuplicates: !0,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    tapToDismiss: !1,
  });
}
