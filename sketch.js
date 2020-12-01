
var dogImg;
var dogImg1;
var foodStock;
var foodS;
var database;
var button1, button2
var fedTime, lastFed
var foodObj


function preload()
{
  
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj = new Food()
  database = firebase.database();

  dog = createSprite(300,200,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  textSize(20);
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 

  feed=createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)


  
}




function draw() {  
  background(46,139,87);
  foodObj.display()
  fill(255,255,254)
  textSize(15)




  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(data){
    
    lastFed=data.val()
  })

  if(lastFed>=12){
    text("Last fed : "+ lastFed%12 + "PM", 350, 30)
  }else if(lastFed==0){
    text("Last fed : 12 AM", 350, 30)
  }else{
    text("Last fed : "+ lastFed + "AM", 350, 30)
  }





  drawSprites();

  

}




function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}



function feedDog(){
  dog.addImage( dogImg1)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}





