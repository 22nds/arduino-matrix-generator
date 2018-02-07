// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

makeGrid();

function makeGrid() {
    // remove the grid if already there
    $("#pixel_canvas").children().remove();

    // Get the grid size and color
    const height = $("#input_height").val();
    const width = $("#input_width").val();

    // create table rows and cells
    for (var i = 0; i < Number(height); i++) {
        $("#pixel_canvas").append("<tr></tr>");
    }

    $("#pixel_canvas tr").each(function() {
        for (var j = 0; j < width; j++) {
            $(this).append("<td></td>");
        }
    });
}

$("#input_height").change(function() {
    makeGrid();
});

$("#input_width").change(function() {
    makeGrid();
});

$("#variable_name")[0].oninput = function() {
    makeCode();
};



// DRAW SHAPE
var isDragging = false;

// color the clicked field
$("#pixel_canvas").on("mousedown", "td", function() {
    isDragging = true;
    if ($(this).hasClass("one")) {
        $(this).removeClass("one");
        $(this).css("background", "#ffffff");
    } else {
        $(this).css("background", "#FF1808");
        $(this).addClass("one");
    }
    makeCode();
});

// color the field if dragging
$("#pixel_canvas").on("mouseenter", "td", function() {
    if (isDragging) {
        if ($(this).hasClass("one")) {
            $(this).removeClass("one");
            $(this).css("background", "#ffffff");
        } else {
            $(this).css("background", "#FF1808");
            $(this).addClass("one");
        }
        makeCode();
    };
});

// stop dragging on mouseup
$("#pixel_canvas").on("mouseup", "td", function() {
    isDragging = false;
});


function makeCode() {
    // byte n[] = {B00000000,B00000000,B01111100,B01100110,B01100110,B01100110,B01100110,B00000000};
    const rows = $("#input_height").val();
    const columns = $("#input_width").val();
    const name = $("#variable_name").val();

    var code = "byte " + name + "[] = {";

    for (var i = 0; i < rows; i++) {
        code = code + "B";
        var row = $("#pixel_canvas tr").eq(i);
        for (var j = 0; j < columns; j++) {
            var cellHasClass = $(row.children()[j]).hasClass("one");
            code = cellHasClass ? code + 1 : code + 0;
        }
        if (i !== rows - 1) {
            code = code + ",";
        }
    }
    code = code + "};";
    $("#code").html(code);
}

// $("#create").on("click", function(e) {
//     e.preventDefault();
//     makeGrid();
// });


// Copy code button
var copyCodeBtn = document.querySelector('.copyCode');
copyCodeBtn.addEventListener('click', function(event) {
    // Select the email link anchor text  
    var codeText = document.querySelector('#code');
    var range = document.createRange();
    range.selectNode(codeText);
    window.getSelection().addRange(range);

    try {
        // Now that we've selected the anchor text, execute the copy command  
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log(codeText.innerText);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported  
    window.getSelection().removeAllRanges();
});