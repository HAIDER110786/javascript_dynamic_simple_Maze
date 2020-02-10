//the function to be called when the HTML body loads
function makeMaze()
{
    //getting the canvas form the HTML through the canvas id
    var canvas=document.getElementById('canvas');
    //getting the 2d context of the canvas
    var ctx=canvas.getContext("2d");


    //declaring 2 varibles 
    var newXX;
    var newYY;


    //looping through rows and columns
    for(var yy=0;yy<10;yy++)
    {
        for(var xx=0;xx<10;xx++)
        {     
            newXX=0;
            newYY=0;               
            newXX=newXX+xx;
            newYY=newYY+yy;
            //sending the columns and the rows to the function to draw lines and make a grid like structure
            printMazeIterationForAllTheRestIterators(xx,yy);
        }
    }



    


    function printMazeIterationForAllTheRestIterators(xx,yy)
    {
        //declaring the width depending on the size of the cell you want
        w=canvas.width/10;

        //multiplying the rows and the columns with the width
        xx=xx*w;
        yy=yy*w;


        //initializing the wall as true
        var wall=[true,true,true,true];

        //moving the the current position of the rows and columns 
        ctx.moveTo(xx,yy);
        //if the wall[0] is true make draw the upper wall of the cell
        if(wall[0])
        {
            ctx.lineTo(xx+w,yy);
        }

        //moving the the current position of the rows and columns
        ctx.moveTo(xx+w,yy);
        //if the wall[1] is true make draw the right wall of the cell
        if(wall[1])
        {
            ctx.lineTo(xx+w,yy+w);
        }

        //moving the the current position of the rows and columns
        ctx.moveTo(xx+w,yy+w);
        //if the wall[2] is true make draw the bottom wall of the cell
        if(wall[2])
        {
            ctx.lineTo(xx,yy+w);
        }    
        
        //moving the the current position of the rows and columns
        ctx.moveTo(xx,yy+w);
        //if the wall[3] is true make draw the left wall of the cell
        if(wall[3])
        {
            ctx.lineTo(xx,yy);
        }
        
        //drawing the lines in the canvas
        ctx.stroke();
    }
}


//function to be called on the generate maze function
function grid()
{

    //all these variables would be redeclared with their initial values evrytime the button is pressed
    var xxx=0;
    var yyy=0;
    var xxxx=0;
    var yyyy=0;
    var half=w/2;
    var canvas=document.getElementById('canvas');
    var ctx=canvas.getContext("2d");
    w=canvas.width/10;
    var col=Math.floor(w);
    var row=Math.floor(w);
    var xx;
    var yy;
    var visited=[];
    var current;
    var next='notnone';
    var stack=[];
    var currentcellstack=[];
    var nextcellstack=[];
    var nextwalacell;
    var currentwalacell;
    var nextkiwall;
    var currentkiwall;
    var newXX=0;
    var newYY=0;
    var wall=[true,true,true,true];
    var ao;
    var yahanSayUthao=[];
    var jao;
    var kiyonnaiaraha=[];
    var rowAndColnumber;
    var previous;

    //clearing the canvas because a new random maze generation has to be done 
    ctx.clearRect(0,0,canvas.width,canvas.width);
    ctx.beginPath();

    //this function supplies the intial points(rows and columns)of each cell to the cell making function 
    mazeChecking();

    //this function actually show the maze on the screen
    function printMazeIterationForAllTheRestIterators(xx,yy)
    {
        //all walls are initialized as true
        wall=[true,true,true,true];
            
        //sizing the area of each cell
        xx=xx*w;
        yy=yy*w;

        //adding row and column to a stack but first converting it to a string
        rowAndColnumber=newYY.toString()+newXX.toString();

        //checking the current cell with the cell whose wall is to be removed
        if(rowAndColnumber===currentwalacell)
        {
            //checking the stack to see if any wall has been removed preivously
            if(checknextcellstack(rowAndColnumber)==true)
            {
                if(kiyonnaiaraha.length==1)
                {
                    var temporary=parseInt(kiyonnaiaraha.pop());
                    wall[temporary]=false;
                }
                else
                {
                    while(kiyonnaiaraha.length>0)
                    {
                        var temporary=parseInt(kiyonnaiaraha.pop());
                        wall[temporary]=false;
                    }
                }
            }

            
            //checking the current cell with the cell whose wall is to be removed
            if(checkcurrentcellstack(rowAndColnumber)==true)
            {
                if(yahanSayUthao.length==1)
                {
                    var temporary=parseInt(yahanSayUthao.pop());
                    wall[temporary]=false;
                }
                else
                {
                    while(yahanSayUthao.length>0)
                    {
                        var temporary=parseInt(yahanSayUthao.pop());
                        wall[temporary]=false;
                    }
                }
            }


            //converting the number of the wall removed to string 
            var holder=currentkiwall.toString();
            //pushing the current cell and adding it with the wall into the stack to keep track 
            currentcellstack.push(rowAndColnumber+holder);

            //making the specifed wall false
            wall[currentkiwall]=false; 
        
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx,yy);
        //if the wall[0] is true make draw the upper wall of the cell
            if(wall[0])
            {
                ctx.lineTo(xx+w,yy);
            }
    
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx+w,yy);
        //if the wall[1] is true make draw the right wall of the cell
            if(wall[1])
            {
                ctx.lineTo(xx+w,yy+w);
            }
    
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx+w,yy+w);
        //if the wall[2] is true make draw the bottom wall of the cell
            if(wall[2])
            {
                ctx.lineTo(xx,yy+w);
            }    
            
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx,yy+w);
        //if the wall[3] is true make draw the left wall of the cell
            if(wall[3])
            {
                ctx.lineTo(xx,yy);
            }
            
            //make the stroke style as black
            ctx.strokeStyle='black';
            //draw the lines
            ctx.stroke();
        }
        //checking the current cell with the cell whose wall is to be removed
        else if(rowAndColnumber===nextwalacell)
        {
            //converting the number of the wall removed to string 
            var holder1=nextkiwall.toString();
            //pushing the current cell and adding it with the wall into the stack to keep track 
            nextcellstack.push(rowAndColnumber+holder1);

            //specify the next wall to be removed
            wall[nextkiwall]=false;


       //moving the the current position of the rows and columns 
        ctx.moveTo(xx,yy);
        //if the wall[0] is true make draw the upper wall of the cell
            if(wall[0])
            {
                ctx.lineTo(xx+w,yy);
            }
    
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx+w,yy);
        //if the wall[1] is true make draw the right wall of the cell
            if(wall[1])
            {
                ctx.lineTo(xx+w,yy+w);
            }
    
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx+w,yy+w);
        //if the wall[2] is true make draw the bottom wall of the cell
            if(wall[2])
            {
                ctx.lineTo(xx,yy+w);
            }    
            
        //moving the the current position of the rows and columns 
        ctx.moveTo(xx,yy+w);
        //if the wall[3] is true make draw the left wall of the cell
            if(wall[3])
            {
                ctx.lineTo(xx,yy);
            }
            
            //make the stroke style as black
            ctx.strokeStyle='black';
            //draw the lines
            ctx.stroke();

        }
        else
        {
            //check the walls of the cell previously removed 
            if(checkcurrentcellstack(rowAndColnumber)==true)
            {
                if(yahanSayUthao.length==1)
                {
                    var temporary=parseInt(yahanSayUthao.pop());
                    wall[temporary]=false;
                }
                else
                {
                    while(yahanSayUthao.length>0)
                    {
                        var temporary=parseInt(yahanSayUthao.pop());
                        wall[temporary]=false;
                    }
                }
            }

            //check the walls of the cell previously removed 
            if(checknextcellstack(rowAndColnumber)==true)
            {
                if(kiyonnaiaraha.length==1)
                {
                    var temporary=parseInt(kiyonnaiaraha.pop());
                    wall[temporary]=false;
                }
                else
                {
                    while(kiyonnaiaraha.length>0)
                    {
                        var temporary=parseInt(kiyonnaiaraha.pop());
                        wall[temporary]=false;
                    }
                }
            }

       //moving the the current position of the rows and columns 
       ctx.moveTo(xx,yy);
       //if the wall[0] is true make draw the upper wall of the cell
           if(wall[0])
           {
               ctx.lineTo(xx+w,yy);
           }
   
       //moving the the current position of the rows and columns 
       ctx.moveTo(xx+w,yy);
       //if the wall[1] is true make draw the right wall of the cell
           if(wall[1])
           {
               ctx.lineTo(xx+w,yy+w);
           }
   
       //moving the the current position of the rows and columns 
       ctx.moveTo(xx+w,yy+w);
       //if the wall[2] is true make draw the bottom wall of the cell
           if(wall[2])
           {
               ctx.lineTo(xx,yy+w);
           }    
           
       //moving the the current position of the rows and columns 
       ctx.moveTo(xx,yy+w);
       //if the wall[3] is true make draw the left wall of the cell
           if(wall[3])
           {
               ctx.lineTo(xx,yy);
           }
           
           //make the stroke style as black
           ctx.strokeStyle='black';
           //draw the lines
           ctx.stroke();

        }
    }

    //pushing the cell concatenated with its cell removed into the stack
    function checkcurrentcellstack(ao)
    {
        for(var han=0;han<currentcellstack.length;han++)
        {
            var currentcellstack23rd=currentcellstack[han][0]+currentcellstack[han][1];
            if(currentcellstack23rd===ao)
            {
                yahanSayUthao.push(currentcellstack[han][2]);
            }
        }

        if(yahanSayUthao.length>0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    //pushing the cell concatenated with its cell removed into the stack
    function checknextcellstack(jao)
    {
        var bool=false;
        for(var je=0;je<nextcellstack.length;je++)
        {
            var nextcellstack23rd=nextcellstack[je][0]+nextcellstack[je][1];
            if(nextcellstack23rd===jao && bool===false)
            {
                kiyonnaiaraha.push(nextcellstack[je][2]);
                bool=true;
            }
        }
        if(kiyonnaiaraha.length>0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    //from this functiom all the data of a cell is sent out
    function mazeChecking()
    {          
        //this is by-default the current cell
        //this cell is the current cell
        current="00";
        //this is variable is not 'none' keep the while loop running 
        while(next!='none')
        {
            //clear the canvas everytime
            ctx.clearRect(0,0,canvas.width,canvas.width);
            ctx.beginPath();

            //BINARY TO DECIMAL CONVERTER
            // var binary = "100";
            // alert(parseInt(binary, 2));

            //this is the variable of the data of the next cell to go into
            next=checkNeighbours(current);

            //remove walls only when the below 2 conditions are meet
            if(next!='none' && next!='notnone')
            //the below function is the one which removes the walls 
            borderRemoval(current,next);

            //going through the columns and the rows and sending out data to be printed
            for(var yy=0;yy<10;yy++)
            {
                for(var xx=0;xx<10;xx++)
                {     
                    newXX=0;
                    newYY=0;               
                    newXX=newXX+xx;
                    newYY=newYY+yy;
                    printMazeIterationForAllTheRestIterators(xx,yy);
                }
            }

            //push the current cell into the visited stack
            visited.push(current);

            //go in the condition if the next is not 'none'
            if(next!='none')
            {
                //make the next cell as the current cell
                current=next;
                //push the current cell in the stack 
                stack.push(current);
            }
            //if stack length is not 0
            else if( stack.length > 0 )
            {
                //here pop a value from the stack and put it into the next if a deadend is encountered
                next=stack.pop();
                //make the next cell as the current cell
                current=next;
            }
            //if condition is true
            else 
            {
                //make next as 'none'
                next='none';
            }
        }
        //draw the ball if the maze has been fully made 
        playerdraw();
    }

    //here the current and the next cell are passed so their corresponding walls can be removed
    function borderRemoval(x,y)
    {
        //separating the the rows and columns of the next and the current wall and converting them to integer type
        var curr_col=parseInt(x[0]);
        var curr_row=parseInt(x[1]);
        var next_col=parseInt(y[0]);
        var next_row=parseInt(y[1]);

        //subtracting the col and rows of the current and the next cell to determine which walls to remove
        var a=curr_col-next_col;
        var b=curr_row-next_row;

        //declaring the values of the walls of the current cell and next cell to be removed
        currentwalacell=x;
        nextwalacell=y;

        if(b==0)
        {
            if(a<0)
            {
                //setting the walls to be removed
                nextkiwall=0;
                currentkiwall=2;
            }
            else if(a>0)
            {
                //setting the walls to be removed
                nextkiwall=2;
                currentkiwall=0;
            }
        }
        else if(a==0)
        {
            if(b<0)
            { 
                //setting the walls to be removed
                nextkiwall=3;
                currentkiwall=1;
            }

            else if(b>0)
            {
                //setting the walls to be removed
                nextkiwall=1;
                currentkiwall=3;
            }
        } 
    }


    //to check for the next neighbour
    function checkNeighbours(current)
    {

        //declare an empty neighbour variable
        var neighbours=[];
        //separating the column and the row of the current cell
        var col=current[0];
        var row=current[1];
        //changing the column and row in the integer form
        var colI=parseInt(col);
        var rowI=parseInt(row);
        
        //if previous row is valid and not visited
        if(colI-1>=0 && colI-1<10 && rowI>=0 && rowI<10 && isvisited(colI-1,rowI)==false)
        {
            colI=colI-1;
            temp=colI.toString()+rowI.toString();
            //push the cell into the neighbour array
            neighbours.push(temp);
            colI=colI+1;
        }     
        //if previous row is valid and not visited
        if(rowI+1>=0 && rowI+1<10 && colI>=0 && colI<10 && isvisited(colI,rowI+1)==false)
        {
            rowI=rowI+1;
            temp=colI.toString()+rowI.toString();
            //push the cell into the neighbour array
            neighbours.push(temp);
            rowI=rowI-1;
        }  
        //if previous row is valid and not visited
        if(colI+1>=0 && colI+1<10 && rowI>=0 && rowI<10 && isvisited(colI+1,rowI)==false)
        {
            colI=colI+1;
            temp=colI.toString()+rowI.toString();
            //push the cell into the neighbour array
            neighbours.push(temp);
            colI=colI-1;
        }
        //if previous row is valid and not visited          
        if(rowI-1>=0 && rowI-1<10 && colI>=0 && colI<10 && isvisited(colI,rowI-1)==false)
        {
            rowI=rowI-1;
            temp=colI.toString()+rowI.toString();
            //push the cell into the neighbour array
            neighbours.push(temp);
            rowI=rowI+1;
        }   
        //if neightbours length is more than 0
        if(neighbours.length>0)
        {
            //return any of the numbr of cell as the next colun to go to cell from the neighbour array 
            var r=(Math.floor(Math.random()*neighbours.length));
            return(neighbours[r]);
        }
        //if neightbour length is less than or equal to 0
        else
        {
            return 'none';
        }
    }

    //check for if a cell is visited or not
    function isvisited(i,j)
    {
        var bool=false;
        var yo=i.toString()+j.toString();
        //check for the next cell in the visited array
        for(var k=0;k<visited.length;k++)
        {
            if(visited[k]==yo)
            {
                bool=true;
                break;
            }
        }
        if(bool===true)
        {   
            return true;
        }
        else
        {
            return false;
        }
    }


    //once the maze is completed and a button is pressed to move the character, keypresser function is called
    document.addEventListener("keydown",keypresser);



    //this function deals with the movement of the character
    function keypresser(event)
    {
        //fill the area for the character movement as white
        ctx.fillStyle="white";
        ctx.fill();

                //if the up arrow is pressed
                if(event.keyCode==38 && yyy-1>=0 && yyy-1<10 && xxx>=0 && xxx<10)    //up
                {
                    wall=[false,false,false,false];

                    var boxofc1=yyy.toString();
                    var boxofc2=xxx.toString();

                    //check for if a wall if present
                    if(checkcurrentcellstack(boxofc1+boxofc2)==true)
                    {
                        if(yahanSayUthao.length==1)
                        {
                            var temporary=parseInt(yahanSayUthao.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(yahanSayUthao.length>0)
                            {
                                var temporary=parseInt(yahanSayUthao.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //check for if a wall is present 
                    if(checknextcellstack(boxofc1+boxofc2)==true)
                    {
                        if(kiyonnaiaraha.length==1)
                        {
                            var temporary=parseInt(kiyonnaiaraha.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(kiyonnaiaraha.length>0)
                            {
                                var temporary=parseInt(kiyonnaiaraha.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //if the condition is met, fill the entire area except for the lines as white
                    if(wall[0]===true)
                    {
                        xxxx=0;
                        yyyy=0;
                        ctx.fillStyle="white";
                        ctx.fill();

                        yyy=yyy-1;
                        xxxx=xxx*50;
                        yyyy=yyy*50;
                        wall=[false,false,false,false];

                        previous=2;
                    }
                }       
                //if the down arrow is pressed
                else if(event.keyCode==40 && yyy+1>=0 && yyy+1<10 && xxx>=0 && xxx<10)   //down
                {
                    wall=[false,false,false,false];

                    var boxofc1=yyy.toString();
                    var boxofc2=xxx.toString();

                    //check for if a wall is present 
                    if(checkcurrentcellstack(boxofc1+boxofc2)==true)
                    {
                        if(yahanSayUthao.length==1)
                        {
                            var temporary=parseInt(yahanSayUthao.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(yahanSayUthao.length>0)
                            {
                                var temporary=parseInt(yahanSayUthao.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //check for if a wall is present                   
                    if(checknextcellstack(boxofc1+boxofc2)==true)
                    {
                        if(kiyonnaiaraha.length==1)
                        {
                            var temporary=parseInt(kiyonnaiaraha.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(kiyonnaiaraha.length>0)
                            {
                                var temporary=parseInt(kiyonnaiaraha.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //if the condition is met, fill the entire area except for the lines as white
                    if(wall[2]===true)
                    {
                        xxxx=0;
                        yyyy=0;
                        ctx.fillStyle="white";
                        ctx.fill();

                        yyy=yyy+1;
                        xxxx=xxx*50;
                        yyyy=yyy*50;
                        wall=[false,false,false,false];

                    }
                }
                //if the left arrow is pressed
                else if(event.keyCode==37 && xxx-1>=0 && xxx-1<10 && yyy>=0 && yyy<10)  //left
                {
                    wall=[false,false,false,false];

                    var boxofc1=yyy.toString();
                    var boxofc2=xxx.toString();

                    //check for if a wall is present
                    if(checkcurrentcellstack(boxofc1+boxofc2)==true)
                    {
                        if(yahanSayUthao.length==1)
                        {
                            var temporary=parseInt(yahanSayUthao.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(yahanSayUthao.length>0)
                            {
                                var temporary=parseInt(yahanSayUthao.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //check for if a wall is present               
                    if(checknextcellstack(boxofc1+boxofc2)==true)
                    {
                        if(kiyonnaiaraha.length==1)
                        {
                            var temporary=parseInt(kiyonnaiaraha.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(kiyonnaiaraha.length>0)
                            {
                                var temporary=parseInt(kiyonnaiaraha.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //if the condition is met, fill the entire area except for the lines as white
                    if(wall[3]===true)
                    {
                        xxxx=0;
                        yyyy=0;
                        ctx.fillStyle="white";
                        ctx.fill();
                    
                        xxx=xxx-1;
                        xxxx=xxx*50;
                        yyyy=yyy*50;
                        wall=[false,false,false,false];

                    }
                }   
                //if the right arrow is pressed          
                else if(event.keyCode==39 && xxx+1>=0 && xxx+1<10 && yyy>=0 && yyy<10)   //right
                {  
                    wall=[false,false,false,false];

                    var boxofc1=yyy.toString();
                    var boxofc2=xxx.toString();

                    //check for if a wall is present
                    if(checkcurrentcellstack(boxofc1+boxofc2)==true)
                    {
                        if(yahanSayUthao.length==1)
                        {
                            var temporary=parseInt(yahanSayUthao.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(yahanSayUthao.length>0)
                            {
                                var temporary=parseInt(yahanSayUthao.pop());
                                wall[temporary]=true;
                            }
                        }
                    }

                    //check for if a wall is present                
                    if(checknextcellstack(boxofc1+boxofc2)==true)
                    {
                        if(kiyonnaiaraha.length==1)
                        {
                            var temporary=parseInt(kiyonnaiaraha.pop());
                            wall[temporary]=true;
                        }
                        else
                        {
                            while(kiyonnaiaraha.length>0)
                            {
                                var temporary=parseInt(kiyonnaiaraha.pop());
                                wall[temporary]=true;
                            }
                        }
                    }


                    //if the condition is met, fill the entire area except for the lines as white
                    if(wall[1]===true)
                    {
                        xxxx=0;
                        yyyy=0;
                        ctx.fillStyle="white";
                        ctx.fill();

                        xxx=xxx+1;
                        xxxx=xxx*50;
                        yyyy=yyy*50;
                        wall=[false,false,false,false];

                    }
                }
        //draw the moveable character on the specified axis
        playerdraw();
    }


    function playerdraw()
    {
        //begin path for the character
        ctx.beginPath();
        //syntax for drawing a circle
        ctx.arc(
            xxxx+half,
            yyyy+half,
            half-1,
            0*Math.PI,
            2*Math.PI
        );

        //color the ball with the desired color
        ctx.fillStyle = "aquamarine";
        ctx.fill();
    }
}