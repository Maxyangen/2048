var table = new Array(new Array(), new Array(), new Array(), new Array());
const KEYLEFT = 37;
const KEYRIGHT = 39;
const KEYUP = 38;
const KEYDOWN = 40;

function start2048Game() {
    initData();
    document.addEventListener('keydown', handleKeyDown);


}

function initData() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            table[i][j] = 0;

    table[1][0] = 2;
    table[1][2] = 2;
    displayTable();
}

function handleKeyDown(event) {

    switch (event.keyCode) {
        case KEYLEFT:
            moveLeft();
            generateNumber();
            break;
        case KEYUP:
            moveUp();
            generateNumber();
            break;
        case KEYRIGHT:
            moveRight();
            generateNumber();
            break;
        case KEYDOWN:
            moveDown();
            generateNumber();
            break;
        default:
            break;
    }


    displayTable();

    if (isGameOver()) {
        alert("Game Over !!");
        location.reload();
    }



}
function isGameOver() {
    var i, j;
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            if (table[i][j] === 0)
                return false;

    for (i = 0; i < 4; i++)
        for (j = 0; j < 3; j++)
            if (table[i][j] === table[i][j + 1])
                return false;

    for (i = 0; i < 4; i++)
        for (j = 0; j < 3; j++)
            if (table[j][i] === table[j + 1][i])
                return false;

    return true;

}

function generateNumber() {
    var countEmpty = 0;
    var index = -1;
    var generateRandomPosition;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (table[i][j] === 0) {
                countEmpty++;
            }
        }
    }

    generateRandomPosition = Math.floor(Math.random() * countEmpty);
    console.log(generateRandomPosition);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (table[i][j] === 0) {
                index++;
                if (index === generateRandomPosition) {
                    table[i][j] = Math.random() <= 0.5 ? 2 : 4;
                    break;
                }
            }
        }
    }


}

function moveLeft() {
    var saveRowData = new Array();
    var i, j, index;
    for (i = 0; i < 4; i++) {
        index = 0;
        for (j = 0; j < 4; j++)
            if (table[i][j] !== 0) {
                saveRowData[index++] = table[i][j];
            }

        while (index < 4)
            saveRowData[index++] = 0;

        for (j = 0; j < 3; j++) {
            if (saveRowData[j] == saveRowData[j + 1]) {
                saveRowData[j] = saveRowData[j] + saveRowData[j + 1];
                index = j + 1;
                while (index < 3) {
                    saveRowData[index] = saveRowData[index + 1];
                    index++;
                }
                saveRowData[4] = 0;
            }
        }


        for (j = 0; j < 4; j++)
            table[i][j] = saveRowData[j];

    }
    //alert("left");
}
function moveRight() {
    var saveRowData = new Array();
    var i, j, index;
    for (i = 0; i < 4; i++) {
        index = 3;
        for (j = 3; j >= 0; j--)
            if (table[i][j] !== 0) {
                saveRowData[index--] = table[i][j];
            }

        while (index >= 0)
            saveRowData[index--] = 0;

        for (j = 3; j >= 1; j--) {
            if (saveRowData[j] == saveRowData[j - 1]) {
                saveRowData[j] = saveRowData[j] + saveRowData[j - 1];
                index = j - 1;
                while (index >= 1) {
                    saveRowData[index] = saveRowData[index - 1];
                    index--;
                }
                saveRowData[0] = 0;
            }
        }


        for (j = 0; j < 4; j++)
            table[i][j] = saveRowData[j];

    }
    //alert("right");
}
function moveUp() {
    var saveRowData = new Array();
    var i, j, index;
    for (i = 0; i < 4; i++) {
        index = 0;
        for (j = 0; j < 4; j++)
            if (table[j][i] !== 0) {
                saveRowData[index++] = table[j][i];
            }

        while (index < 4)
            saveRowData[index++] = 0;

        for (j = 0; j < 3; j++) {
            if (saveRowData[j] == saveRowData[j + 1]) {
                saveRowData[j] = saveRowData[j] + saveRowData[j + 1];
                index = j + 1;
                while (index < 3) {
                    saveRowData[index] = saveRowData[index + 1];
                    index++;
                }
                saveRowData[4] = 0;
            }
        }


        for (j = 0; j < 4; j++)
            table[j][i] = saveRowData[j];

    }
    //alert("up");
}

function moveDown() {
    var saveRowData = new Array();
    var i, j, index;
    for (i = 0; i < 4; i++) {
        index = 3;
        for (j = 3; j >= 0; j--)
            if (table[j][i] !== 0) {
                saveRowData[index--] = table[j][i];
            }

        while (index >= 0)
            saveRowData[index--] = 0;

        for (j = 3; j >= 1; j--) {
            if (saveRowData[j] == saveRowData[j - 1]) {
                saveRowData[j] = saveRowData[j] + saveRowData[j - 1];
                index = j - 1;
                while (index >= 0) {
                    saveRowData[index] = saveRowData[index - 1];
                    index--;
                }
                saveRowData[0] = 0;
            }
        }


        for (j = 0; j < 4; j++)
            table[j][i] = saveRowData[j];

    }
    //alert("down");
}

function displayTable() {
    var tableTdId;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            tableTdId = String(i) + String(j);
            //console.log(typeof(tableTdId));
            //document.getElementById(tableTdId).innerHTML = table[i][j];
            if (table[i][j] !== 0)
                document.getElementById(tableTdId).innerHTML = table[i][j];
            else
                document.getElementById(tableTdId).innerHTML = " ";
        }
    }
}

