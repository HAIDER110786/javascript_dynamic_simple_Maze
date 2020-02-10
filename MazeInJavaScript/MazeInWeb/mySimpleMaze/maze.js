function grid()
{
    
        var x=0;
        var y=0;
        var xx=0;
        var yy=0;
        var xxx=0;
        var yyy=0;
   
        document.getElementById("timer").innerHTML = 0 + " : " + "10" ;
   
        var theMainValue=document.getElementById("timer").innerHTML = 0 + " : " + "10" ;
   
        var currTime = document.getElementById("timer").innerHTML ;
   
        var currTimeArray = currTime.split(":");
           
        var minutes = currTimeArray[0];
        var seconds = currTimeArray[1];
   
   timerSetting();
   
        function timerSetting()
        {
           if(seconds==00)
              {
           
           if(minutes>0)
              {
                 minutes = minutes - 1 ;
           
                 seconds=60;
           
                if(seconds!=00)
                {
                   seconds = seconds - 1 ;
                }
                 
              }
                 else
                    {
                       alert("your time has ended");
                       yo=1;
                    }
              
              }
           
           else
              {
                 seconds = seconds - 1 ;
              }
           
           if(seconds < 10 && seconds >= 0 )
              {
                 seconds = "0" + seconds ;
              }
           
        document.getElementById("timer").innerHTML = minutes + " : " + seconds ;
           
              setTimeout(timerSetting,1000);
           
        }
   

    
    
        var canvas = document.getElementById("cnv");
        var ctx = canvas.getContext('2d'); 
    
        var maze = [    
                     [2,1,1,1,1,1,1,1,1,1],
                     [0,0,0,0,0,0,0,0,0,1],
                     [0,1,0,1,1,1,1,1,0,1],
                     [1,1,1,1,0,0,1,1,0,1],
                     [1,0,0,1,1,1,0,1,0,1],
                     [1,1,0,0,0,0,0,1,0,1],
                     [0,1,0,1,1,1,0,1,0,1],
                     [0,1,0,1,0,1,0,1,1,1],
                     [0,1,0,1,0,1,1,0,0,1],
                     [3,1,0,1,0,0,1,1,1,1],
               ];
    
    var width = canvas.width;
    var blockSize = width / maze.length;
    var half = blockSize / 2;
    var yo=0;
    
    for(var col=0;col<maze.length;col++)
    {
        for(var row=0;row<maze[col].length;row++)
        {
            if(maze[col][row] === 1 || maze[col][row] === 2)
            {
                 if(col===0 && row ===0 && maze[col][row] === 2)
                   {
                      ctx.fillStyle="lightgreen";
                      ctx.fillRect(row*50,col*50,50,50);  
                      playerdraw(); 
                   }
                else
                  {
                      ctx.fillStyle="white";
                      ctx.fillRect(row*50,col*50,50,50);  
                  }
            }
            else if(col===9 && row ===0)
            {
                ctx.fillStyle="red";
                ctx.fillRect(row*50,col*50,50,50);  
            }
            else if(maze[col][row] === 0)
            {
                ctx.fillStyle="black";
                ctx.fillRect(row*50,col*50,50,50);
            }
        }
    }
    
function playerdraw()
{
    ctx.beginPath();
    ctx.arc(
        xx+half,
        yy+half,
        half,
        0*Math.PI,
        2*Math.PI
    );
    ctx.fillStyle = "blue";
    ctx.fill();
   
   if(y===9 && x===0)
      {
         y=-1,x=-1;
         setTimeout(function(){alert("congrats!you have reached the end of the game")},1);
         maze[9,1]=0;
         yo=1;  
      }
}

    
document.addEventListener("keydown",keypresser);
    
    
function keypresser(event)
{
    //alert("button pressed");
   
    if(event.keyCode==38)
       {
          if(yo==1)
             {
                alert("you have already reached the end");
             }
          else
             {
    if(event.keyCode==38 && y>=0 && y<maze.length && x>=0 && x<maze.length && maze[y-1][x]==1)
        {
            maze[y][x]=1;
            ctx.fillStyle="white";
            ctx.fillRect(x*50,y*50,50,50);  
           
            yy=yy-50;
            y=y-1;
        }
                
             }
       
          
       }
   
   
   
       if(event.keyCode==40)
       {
          if(yo==1)
             {
                alert("you have already reached the end");
             }
          else
             {
    if(event.keyCode==40 && y>=0 && y<maze.length && x>=0 && x<maze.length && maze[y+1][x]==1)
        {
            maze[y][x]=1;
            ctx.fillStyle="white";
            ctx.fillRect(x*50,y*50,50,50);
           
            yy=yy+50;
            y=y+1;
        }

             }
       }
                     
             
   
   
      if(event.keyCode==37)
       {
          if(yo==1)
             {
                alert("you have already reached the end");
             }
          else
             {
      if(event.keyCode==37 && x>=0 && x<maze.length && y>=0 && y<maze.length && (maze[y][x-1]==1 || maze[y][x-1]==2 || maze[y][x-1]==3))
        {
            maze[y][x]=1;
            ctx.fillStyle="white";
            ctx.fillRect(x*50,y*50,50,50);
           
            xx=xx-50;
            x=x-1;
        }
                     
             }
       }
   
   
   
   if(event.keyCode==39)
      {
         if(yo==1)
      {
         alert("you have already reached the end");
      }
   else
      {
      if(event.keyCode==39 && x>=0 && x<maze.length && y>=0 && y<maze.length && maze[y][x+1]==1)
        {
           if(maze[y][x]==2)
              {
                  ctx.fillStyle="lightgreen";
                  ctx.fillRect(x*50,y*50,50,50);
              }
           else if(maze[y][x]==3)
              {
                  
                 ctx.fillStyle="red";
                 ctx.fillRect(x*50,y*50,50,50);
              }
            else if(maze[y][x]==1)
              {
                  ctx.fillStyle="white";
                  ctx.fillRect(x*50,y*50,50,50);
              }
              xx=xx+50;
              x=x+1;
        }
      }
      }
    playerdraw();
}
}
