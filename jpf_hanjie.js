"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: Hendrix Pineda
   Date:   1/22/21

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

// Run the init() function when the page loads
window.onload = init;

// Global variable to store all of the puzzles <td> elements
let puzzleCells;
// global variable to store the cell background color
let cellBackground;

// Definiton of the init() function
function init() {
   //Insert the title for the first puzzle
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   //insert the HTML code for the first puzzle table
   document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   //Add event handlers for puzzle buttons
   let puzzleButtons = document.getElementsByClassName("puzzles");
   // Loop through the puzzle button objects attaching the onclick even handler to each one
   for(let i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = swapPuzzle;
   }// end of for loop

   // call to the setupPuzzle() function to turn the cells gold
   setupPuzzle();

   // Add an event listener for the mouseup event
   document.addEventListener("mouseup", endBackground);

   // add an event listener to the show solution button
   document.getElementById("solve").addEventListener("click", function(){
      // remove he inline background color style from each cell
      for(let i = 0; i < puzzleCells.length; i++) {
         puzzleCells[i].style.backgroundColor = "";
      }// end of for loop
      } //end of anonymous function
   );

   
} //end of init() function

// Function definition for the swapPuzzle() function

function swapPuzzle(e) {

      // If statement to confirm user actually want to swap puzzles
      if(confirm("You will loose all of your work on the puzzle! Continue?")) 
          {
      //figuring out which button generated the click event by its ID
      let puzzleID = e.target.id;

      // extract the value of the target button
      let puzzleTitle = e.target.value;

      // write the value of puzzleTitle to the document
      document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

      // switch statememnt to decide which puzzleID value 
      switch(puzzleID) {
         case "puzzle1":
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1); break;
         case "puzzle2":
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2); break;
         case "puzzle3":
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3); break;
      }// end switch statement

    //call to the setupPuzzle() function to turn all puzzle cells gold
    setupPuzzle();
     } 
   }
// Funtion definition for the setupPuzzle() function
function setupPuzzle() {
   // collect all of the data cells in the puzzle
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");
   // set the initial color of each <td> in the puzzle to gold
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].style.backgroundColor = "rgb(233,207,29)";

      //trigger the setBackground() function in response to the mousedown event
      puzzleCells[i].onmousedown = setBackground;
      //Usklowe a pencil image as a cursor
      puzzleCells[i].style.cursor = "url('jpf_pencil.png'), pointer";
   }//end of for loop

   // check the puzzle solution
   document.getElementById("hanjieGrid").addEventListener("mouseup",
      function(){
         let solved = true;
           for(let i =0; i < puzzleCells.length; i++){
               if((puzzleCells[i].className === "filled" && puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)")||
                  (puzzleCells[i].className === "empty" && puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")){
                  solved = false;
                  break;
               }// end of if statement
           }// end of for loop
           // All cells have been checked and look to be the correct color
           if(solved) {
            alert("You solved the puzzle!!");

           }
         }//end of anonymous function
      );

   // Create arrays of the filled and empty cells
   let filled = document.querySelectorAll("table#hanjieGrid td.filled");
   let empty = document.querySelectorAll("table#hanjieGrid td.empty");

   // create an event listener to highlight incorrect cells

   document.getElementById("peek").addEventListener("click", function(){
      //Display incorrect white cells in pink
         for(let i = 0; i < filled.length; i++) {
            if(filled[i].style.backgroundColor ==="rgb(255, 255, 255)"){
               filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            }
         }

         // Display incorrect gray cells in red
         for(let i = 0; i <empty.length; i++) {
            if(empty[i].style.backgroundColor === "rgb(101, 101, 101)"); {
               empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }
         }
       // Remove the hints after 0.5 seconds
       setTimeout(
         function() {
            // Change pink cells to white and red cells to gray
            for(let i = 0; i < puzzleCells.length; i++) {

               if(puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)"){
                  puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
               }
               if(puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)"){
                  puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
               }
            }
         }, 500);
         
      }// end of anonymous function
   ); //end of anonymous function
   
}//end of setupPuzzle() function


// Function definition for the setBackground() function
function setBackground(e) {
   // set the background color based on the keyboard key
   
   let cursorType;

   if(e.shiftKey) {
      cellBackground = "rgb(233,207,29)";
      cursorType = "url('jpf_eraser.png'), cell";
   } else if(e.altKey) {
      cellBackground = "rgb(255,255,255)";
      cursorType= "url('jpf_cross.png'), crosshair";
   } else {
      cellBackground = "rgb(101,101,101)";
      cursorType = "url('jpf_pencil.png'), pointer";
   }

   //once the background color is set, apply to the <td> cell that generated the event

   e.target.style.backgroundColor = cellBackground;

   // create an event listener for every puzzle cell
   for (let i =0; i < puzzleCells.length; i++) {
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }//end of for loop

   // Prevent the default action of selecting table text
   e.preventDefault();
}

// Function definition for the extendBackground() function
function extendBackground(e) {
e.target.style.backgroundColor = cellBackground;
}

// Function definition for the endBackground
function endBackground() {
   // Remove the mouseenter event listener for every puzzle cell and change the cursor back to the default
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = "url('jpf_pencil.png'), pointer";
   }//end of for loop
}
         
/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {
   
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}