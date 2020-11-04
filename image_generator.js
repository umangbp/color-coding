/*
Title: Color Code Challenge
Author: Umang Patel
Email: umang2332@gmail.com
*/

var colors = [];    // array to hold combination of colors 
var color_counter = 0; // color counter for counting colors in loop

var square_size = 8;    // size of each square in pixels ex. 8x8
var square_per_row = 16;   
var spacing = 4;    //  spacing between each squares in pixels 
var squares_count = 0;  // count variable to keep track of number of squares in row
var squares_row_count = 0; 

var position_x = 0;     //  pixel position on x axis 
var position_y = 0;     //  pixel position on y axis 

// select element from DOM and get 2d context of canvas
var drawing_board = document.getElementById("drawing_board");
var ctx_drawing_board = drawing_board.getContext("2d");

// width and height of current canvas
var width = drawing_board.width;
var height = drawing_board.height;

// creating image data array for current canvas (array of )
var image_data = ctx_drawing_board.createImageData(width, height);


/* 
   Function to print design on screen by filling pixel colors to image data array
   Paras: color_arr - array of 32 unique colors generated using RGB values 
*/
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

ctx_drawing_board.putImageData(image_data, 15, 30); 
