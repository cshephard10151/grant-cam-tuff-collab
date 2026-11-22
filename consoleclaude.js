let input = document.getElementById("input");
let button = document.getElementById("button");

// ---------- game settings ----------
const SIZE = 4;
const MOD = 3;                                             // blocks hold 0, 1, 2, then wrap
const PATTERN = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]; // plus shape; swap for other days
const SCRAMBLE_MOVES = 6;                                  // roughly the par

// ---------- game state ----------
let p = new Array(SIZE * SIZE).fill(0);   // p[0]..p[15] replace p1..p16
let startGrid = [];
let undoStack = [];
let writes = 0;
let par = 0;
let phase = "intro";                      // "intro" -> "playing" -> "won"

let last_input = "";
var iscommand = false;

// ---------- console output ----------
// Scrolls everything up one line and puts the new text at the bottom (id 1)
// Scrolls everything up one line and puts the new text at the bottom (id 1).
// Pass html = true only for lines YOU built (like the board), never for player input.
function printLine(text, html = false) {
    String(text).split("\n").forEach(function (line) {
        for (let i = 9; i > 1; i--) {
            document.getElementById(i).innerHTML = document.getElementById(i - 1).innerHTML;
        }
        const last = document.getElementById(1);
        if (html) {
            last.innerHTML = line === "" ? "&nbsp;" : line;
        } else {
            last.textContent = line === "" ? "\u00A0" : line;
        }
    });
}

// ---------- game logic ----------
function applyWrite(index, delta) {
    const r = Math.floor(index / SIZE);
    const c = index % SIZE;
    for (const [dr, dc] of PATTERN) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
            const i = nr * SIZE + nc;
            p[i] = ((p[i] + delta) % MOD + MOD) % MOD;
        }
    }
}

function isSolved() {
    return p.every(function (v) { return v === 0; });
}

// Seeded random so everyone gets the same puzzle on the same day
function mulberry32(a) {
    return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function dailySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Builds a puzzle by running writes backwards from a clean grid,
// so it is always solvable.
function newPuzzle() {
    const rand = mulberry32(dailySeed());
    do {
        p.fill(0);
        const picks = new Array(SIZE * SIZE).fill(0);
        for (let k = 0; k < SCRAMBLE_MOVES; k++) {
            const i = Math.floor(rand() * SIZE * SIZE);
            picks[i]++;
            applyWrite(i, -1);
        }
        // writing a block MOD times does nothing, so only count the remainder
        par = picks.reduce(function (sum, n) { return sum + (n % MOD); }, 0);
    } while (isSolved());

    startGrid = p.slice();
    undoStack = [];
    writes = 0;
}

// ---------- board display ----------
const GLYPHS = ["■", "▲", "●"];   // 0 = clean, 1 = corrupted, 2 = critical

function cellHTML(value) {
    return `[<span class="blk blk${value}">${GLYPHS[value]}</span>]`;
}

function printBoard() {
    const letters = "ABCD".slice(0, SIZE).split("");
    const header = "  " + letters.map(function (l) { return " " + l + " "; }).join(" ");
    printLine(header.replace(/ /g, "\u00A0"));

    for (let r = 0; r < SIZE; r++) {
        const cells = [];
        for (let c = 0; c < SIZE; c++) {
            cells.push(cellHTML(p[r * SIZE + c]));
        }
        printLine(`${r + 1}&nbsp;${cells.join("&nbsp;")}`, true);
    }
}

function printStatus() {
    printLine(`WRITES: ${writes}  PAR: ${par}`);
}

function startGame() {
    newPuzzle();
    phase = "playing";
    printLine("MEMORY CORRUPTED. TURN EVERY BLOCK GREEN.\nTYPE write B2 TO BEGIN. (PAR " + par + ")\nEACH WRITE: GREEN > AMBER > RED > GREEN");
    printBoard();
}

// ---------- command handling ----------
function runGameCommand(raw) {
    const parts = raw.trim().toUpperCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1] || "";

    if (phase === "intro") {
        if (cmd === "Y") {
            startGame();
        } else if (cmd === "N") {
            printLine('OK. RUN "help" WHEN READY.');
        } else {
            printLine("BEGIN? Y/N");
        }
        return;
    }

    if (cmd === "WRITE") {
        if (phase !== "playing") {
            printLine('PUZZLE COMPLETE. RUN "reset" TO REPLAY.');
            return;
        }
        if (!/^[A-D][1-4]$/.test(arg)) {
            printLine("USAGE: write B2");
            return;
        }
        const c = arg.charCodeAt(0) - 65;
        const r = Number(arg[1]) - 1;

        undoStack.push(p.slice());
        applyWrite(r * SIZE + c, 1);
        writes++;
        printBoard();

        if (isSolved()) {
            phase = "won";
            printLine("BOOT SUCCESSFUL.\nSOLVED IN " + writes + ". PAR IS " + par + ".");
        } else {
            printStatus();
        }
    } else if (cmd === "UNDO") {
        if (undoStack.length === 0) {
            printLine("NOTHING TO UNDO.");
            return;
        }
        p = undoStack.pop();
        writes--;
        phase = "playing";
        printBoard();
        printStatus();
    } else if (cmd === "RESET") {
        p = startGrid.slice();
        undoStack = [];
        writes = 0;
        phase = "playing";
        printBoard();
        printStatus();
    } else {
        printLine("UNKNOWN COMMAND. TRY: write B2");
    }
}

// ---------- input handling ----------
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
    if (e.key === "ArrowUp") {
        console.log(last_input);
        input.value = last_input;
    }
});

input.focus();

// ---------- welcome screen ----------
for (let i = 1; i < 10; i++) {
    document.getElementById(i).textContent = "\u00A0";
}
document.getElementById(8).textContent = "Welcome!";
document.getElementById(7).textContent = 'run "help" for command help.';
document.getElementById(6).textContent = "Begin? Y/N";

button.onclick = function () {
    last_input = input.value;
    const raw = input.value.trim();
    let handled = false;   // true if something other than the game already used this input

    const pattern = /^\([^,]+,\s*[^,]+,\s*[^,]+\)$/;

    function isNumeric(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }

    if (pattern.test(raw)) {
        let [red, green, blue] = raw.replace(/[()]/g, "").split(",").map(function (item) { return item.trim(); });
        console.log(red, green, blue);
        if (isNumeric(red) && isNumeric(green) && isNumeric(blue)) {
            if (typeof change_bg_color === "function") {
                change_bg_color(red, green, blue);
            }
            handled = true;
        }
    }

    if (raw === "") {
        return;
    }

    if (raw.toLowerCase() === "help") {
        iscommand = true;
        document.getElementById(9).textContent = "\u00A0";
        document.getElementById(8).textContent = "help";
        document.getElementById(7).textContent = "------------------------------------";
        document.getElementById(6).textContent = "\u00A0";
        document.getElementById(5).textContent = "To change background color, run '(color1, color2, color3).'";
        document.getElementById(4).textContent = "To begin, press Y.";
        document.getElementById(3).textContent = "For a list of commands, run cmds";
        document.getElementById(2).textContent = "Game: write B2 | undo | reset";
        document.getElementById(1).textContent = phase === "intro" ? "Begin? Y/N" : "\u00A0";
    }

    if (iscommand === false) {
        printLine(raw);                 // echo what the player typed
        if (!handled) {
            runGameCommand(raw);
        }
    }

    input.value = "";
    iscommand = false;
};