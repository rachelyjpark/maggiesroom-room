console.log("Hello, Airtable!");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({ apiKey: "keyi1IBlNibommJFD" }).base(
  "app0OfTXzDJWZCYRA"
);


base("room").select({}).eachPage(gotPageOfRoom, gotAllRoom);

const room = [];

var counter = 0
function gotAllRoom(err) {
  console.log("gotAllRoom()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
 }

   consoleLogRoom();
  //showRoom();
    try {
    showRoom();
  } catch(e) {
    console.error(e);
  }

}


 function gotPageOfRoom (records, fetchNextPage) {
   room.push(...records);
   fetchNextPage();
 }


// just loop through the books and console.log them
function consoleLogRoom() {
  console.log("consoleLogRoom()");
  room.forEach(room => {
    console.log("Room:", room);
  });
}


 
function showRoom() {
  console.log("showRoom()");
  room.forEach((room, i) => {
console.log(i);
    var roomTitle = document.createElement("h1");
    roomTitle.classList.add("room-title");
    roomTitle.innerText = room.fields.title;
      document.body.append(roomTitle);
         document.querySelector("#container").append(roomTitle);


      var nameofDescription = document.createElement("p");
      nameofDescription.classList.add("room-description");
    nameofDescription.innerText = room.fields.description;
      document.body.append(nameofDescription);
        document.querySelector("#container").append(nameofDescription);

     
      if (room.fields.image.length > 0){
       var roomImage = document.createElement("img");
      roomImage.classList.add("room-image");
         roomImage.src = room.fields.image[0].url;
      document.querySelector("#container").append(roomImage);
      }
 
  });
  switchImage(0)
    window.addEventListener('wheel', _.debounce(switchImage, 50,{'leading': true, 'trailing': true}))
}



function switchImage(event){
  console.log(event);
  if (event.wheelDeltaY > 0 && counter < room.length) {
    counter ++;

  }else if (counter > 0) {
    counter --;
  };
console.log(room);
console.log(counter);
var title = room[counter].fields.title;
  var image = room[counter].fields.image[0].url;
  var description = room[counter].fields.description;
  document.querySelector(".title").innerText = title;
  document.querySelector(".description").innerText = description;
    document.querySelector(".roomimage").src = image;
   

}








