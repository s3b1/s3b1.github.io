// user's entries
var unix = ["whoami", "help", "bike", "fun", "version", "clear"];
// array of function pointers
var tab = {
  1: "Unknown command. Type 'help' for more information",
  2: resume(),
  3: "This the help section. The terminal accepts following commands: " + printCommands(),
  4: bike(),
  5: pancakes(),
  6: "My own terminal for fun. Feel free to reuse :)",
  7: "Press CTRL + L to clear the terminal",
};
// keyboards detection
var map = {17: false, 76: false, 13: false, 88: false};

// when document is loaded
document.addEventListener('DOMContentLoaded', function(event) {
  var input = document.getElementById("input");
  var outputWrapper = document.getElementById("output-wrapper");
  input.focus();
  listenKeys(input, outputWrapper);
});

// listen user key input (entry and CTRL + L)
// on keydown, keys in map are set to true
function listenKeys(a, b) {
  a.addEventListener("keydown", function (e) {
    if (e.keyCode in map){
      map[e.keyCode] = true;
    }
  });
  // on keyup, if keys in map are true then specific actions are triggered
  a.addEventListener("keyup", function (e) {
    // entry
    if (map[13]) {
      // validate the terminal entry
      validate(e.srcElement.value, b);
    // CTRL + L
    } else if (map[17] && map[76]) {
      // reset the terminal
      location.reload();
    }
    // once the action is triggered, keys in map are set back to false
    if (e.keyCode in map){
      map[e.keyCode] = false;
    }
  });
}

// When entry key is pressed, the input is added in the output section and the user input is processed
function validate(e, output) {
  // make header
  var headerOutput = document.createElement("div");
  output.appendChild(headerOutput);
  headerOutput.setAttribute("class", "header-output");
  headerOutput.innerHTML="s3b1@github&nbsp;&nbsp;$&nbsp;" + e;

  // map unix entry with tab value
  //var search = unix.indexOf(e);
  var unixTab = mapUnixTab(unix.indexOf(e));

  // make outputPrefix
  var outputDiv = document.createElement("div");
  output.appendChild(outputDiv);
  outputDiv.setAttribute("class", unixTab[0] + "-output");
  outputDiv.innerHTML = unixTab[1];
  // reset the input
  input.value="";
  return false;
}

// if the user entry is found in unix then it displays the command output otherwise it throws an error
function mapUnixTab(e) {
  var found = false;
  var outputPrefix = "";
  var html = "";
  if (e > -1) {
    // command found = output.value = tab[e];
    found = true;
    outputPrefix = "text";
    html = tab[e + 2];
  } else {
    //command not found = output.value = tab[4];
    found = true;
    outputPrefix = "error";
    html = tab[1];
  }
  return [outputPrefix, html];
}

// print all the unix commands in a list
function printCommands() {
  var list = "<ol>"
  for (var i = 0; i < unix.length; i++) {
    list += "<li>" + unix[i] + "</li>";
  }
  list += "</ol>";
  return list;
}

// custom functions
function bike() {
  return "Bike section in progress";
}

function pancakes() {
  return "Pancakes section in progress";
}

function resume() {
  return "My private section in progress";
}
