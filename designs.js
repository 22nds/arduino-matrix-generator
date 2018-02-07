// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {
    // remove the grid if already there
    $("#pixel_canvas").children().remove();

    // Get the grid size and color
    const height = $("#input_height").val();
    const width = $("#input_width").val();
    const color = $("#colorPicker").val();

    // create table rows and cells
    for (var i = 0; i < Number(height); i++) {
        $("#pixel_canvas").append("<tr></tr>");
    }

    $("#pixel_canvas tr").each(function() {
        for (var j = 0; j < width; j++) {
            $(this).append("<td></td>");
        }
    });

    // color the clicked field
    $("#pixel_canvas").on("click", "td", function() {
        if ($(this).hasClass("one")) {
            $(this).removeClass("one");
            $(this).css("background", "#ffffff");
        } else {
            $(this).css("background", color);
            $(this).addClass("one");
        }
        makeCode();
    });

}

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

$("#create").on("click", function(e) {
    e.preventDefault();
    makeGrid();
});