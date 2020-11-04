This repository contain code for color coding challenge. The javascript program generates unique RGB colors from rgb space and generates design using those colors in such a way that no colors are left unused from the color space.

#### Code Overview

```html
<html>
    <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <title>Color Code Challenge</title>
    </head>
    <body>
        <div id="main_div">
            <h1>Color Coding Challenge</h1>
            <span>Developer: Umang Patel</span><br/>
            <span>Email: umang2332@gmail.com</span>
        </div>
        <div>
            <canvas id="drawing_board" width="500" height="500" style="border:1px solid #000000;"></canvas>
        </div>

        <script src="./image_generator.js"></script>
    </body>
</html>
```

Above is a HTML code which contains canvas element. our javascript code will use this canvas element to dynamically draw image on the browser screen. Now let's walkthrough the javascript code and understand the logic used to generate the design.

```javascript
var colors = [];    // array to hold combination of colors 
var color_counter = 0; // color counter for counting colors in loop

var square_size = 8;    // size of each square in pixels ex. 8x8
var square_per_row = 16;   
var spacing = 4;    //  spacing between each squares in pixels 
var squares_count = 0;  // count variable to keep track of number of squares in row
var squares_row_count = 0; 

var position_x = 0;     //  pixel position on x axis 
var position_y = 0;     //  pixel position on y axis 
```

First the script defines all the necessary control and data variables which will be used to implement the overall logic of the script.

```javascript
// select element from DOM and get 2d context of canvas
var drawing_board = document.getElementById("drawing_board");
var ctx_drawing_board = drawing_board.getContext("2d");

// width and height of current canvas
var width = drawing_board.width;
var height = drawing_board.height;

// creating image data array for current canvas (array of )
var image_data = ctx_drawing_board.createImageData(width, height);
```

Now once the variables are defined, lets start working with the canvas. first part of the code selects the canvas element using its id and then gets 2d context of the canvas element. Canvas context is an javascript object which contains properties and methods that can be used to render graphics on canvas element.

Now using the canvas context, create image data which will return an array with all the information about image like RGB values, transaparencies etc.

```javascript
// looping on all 32 parts of each RGB color space to generate all color combinations
// entire range of 0-256 is devided into 32 parts (multiples of 8)
for(var r=8; r<=256; r=r+8){
    
    for(var g=8; g<=256; g=g+8){
        
        for(var b=8; b<=256; b=b+8){

            // creating a string of RGB seperated by comma 
            var rgb = r+","+g+","+b;

            // adding generated RGB combination in array
            colors.push(rgb);
            color_counter++;

            // once have 64 combination of rgb colors send it to print_design function to print square 
            // each square is of 8x8 so total 64 unique colors are generated 
            if(color_counter == 64){
                print_design(colors);

                // setting color_counter to zero and empty colors array to generate next batch of 64 unique colors
                color_counter = 0;
                colors = [];
            }   
        }
    }
}
```

Once image data object is obtained, use nested for loop which will generate various combination of RGB values based on the condition of the challenge. we will generate colors in block of 64 colors at a time to create square on canvas. each square on the canvas is made of 64 pixels (8x8) and we will assign a unique color to each of the pixel in the square.

each color combination generated using the loops is stored in a temporary array which holds the colors. moreover, a counter variable is used to count the number of colors generated in a loop, once we have block of 64 colors, they will be sent to print_design() function as an argument where it will be used for printing output.

```javascript
function print_design(color_arr){
    
    var color_arr_index = 0;

    // once function receive colors loop on x and y coordinates to print square 
    for(var x = position_x; x < position_x + square_size; x++){

        for(var y = position_y; y < position_y + square_size; y++){
            
            // finding pixel index in imagedata array 
            var pixelindex = (y * width + x) * 4;
            
            // split value from color_arr item to obtain RGB values
            var square_color = color_arr[color_arr_index].split(',')

            var red = square_color[0];
            var green = square_color[1];
            var blue = square_color[2];

            // set rgb and transparency value in image_data
            image_data.data[pixelindex] = red;     // Red
            image_data.data[pixelindex+1] = green; // Green
            image_data.data[pixelindex+2] = blue;  // Blue
            image_data.data[pixelindex+3] = 255;   // Alpha

            color_arr_index++ // increamenting color_index to make sure colors are not reused
        }
    }

    squares_count++;  
    color_arr_index = 0
    
    // if number of square are less then total squars per row then 
    // increament position of x to starting pixel of next square
    if(squares_count < square_per_row){
        position_x = position_x + square_size + spacing;
    }
    else{
        // once total squares reached maximum allowed squars in row
        // reset square count and go to next row on screen
        squares_count = 0;
        squares_row_count++;

        // adjust positio of x and y to generate designed output 
        position_x = squares_row_count * square_size + spacing;
        position_y = position_y + square_size + spacing;

    }
}
```

This function contains actual logic for generating image, first we have nested for loops which calculates the position of pixels on x and y axies. Positions of X and Y are calculated based on size of square (8x8) and current location of x and y positions. initially the position of X and Y will be zero and as the loop continues it calculates the position where the next square will be drawn.

Inside the loop, an array of 64 unique colors which we received as parameter to the function will be used to get RGB values for particular color. Array elements contains rgb value in comma seperated values which will then be split using split() function to obtain individual RGB value. Once RGB values are obtained, they are assigned to image_data object.

After exiting from the loop we check if number of squars in a row is less than maximul allowed squars per row. If its less then we will adjust the position of x in such a way that next square will be drawn next to previous square on the same row.

If number of squares are more than maximul allowed in a row, we will adjust the values of X and Y in such a way that next square will be drawn on new row with appropriate spacing on the front to generate nice pattern.

```javascript
// printing image data on canvas
ctx_drawing_board.putImageData(image_data, 15, 30); 
```

At the very end, we use putImageData() function to place pixel values stored in image_data and draw the output in canvas.
