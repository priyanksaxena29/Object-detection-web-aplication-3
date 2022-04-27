Status = "";
Img = "";
canvas = "";
Objects = [];

function preload()
{
   Img = loadImage("Book.png") ;
}

function setup ()
{
    canvas = createCanvas(400, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusLabel").innerHTML = "Status : Detecting Oblects";
}

function draw()
{
   image(Img, 50, 250, 300, 280 );
     if (Status)
     {
         for(i = 0; i < Objects.length; i++)
         {
             var txt = "is " + Objects.length.toString() +  " object";
             if(Objects.length > 1)
                txt = "are " + Objects.length.toString() +  " objects";
            document.getElementById("result").innerHTML = "There " + txt +" in the image as per cocossd.";
            
            fill("#FF0000");
            percent = floor(Objects[i].confidence * 100 );
            text(Objects[i].label + " : " + percent + "%", Objects[i].x + 50 + 15, Objects[i].y + 250 + 15);
            noFill();
            stroke("#FF0000");
            rect(Objects[i].x + 50, Objects[i].y + 250, Objects[i].width, Objects[i].height);
         }
     }
}

function modelLoaded ()
{
    console.log("Model ! Loaded");
    objectDetector.detect(Img, gotResult);
}

function gotResult (error, results)
{
    console.log("Entered GotResults");
    if(error)
        console.error(error);
    else 
        {
            console.log(results);
            Objects = results;
            Status = true;
        }
}
