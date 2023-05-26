/**
 * ***********************************************************************
 * Library for manipulating images stored as either matrices or arrays.
 * ***********************************************************************
 */

// ------------------------------- IMPORTS -------------------------------
// -----------------------------------------------------------------------


// ------------------------------- CONSTANTS -----------------------------
// Tolerance for 2 colors to be considered in the same group.
const EPSILON = 0;
const ALPHA_EPSILON = EPSILON;
const COLOR_EPSILON = EPSILON*3;

// Canvas used to convert images.
const canvas = document.createElement('canvas');
// -----------------------------------------------------------------------


// ------------------------------ FUNCTIONS ------------------------------
function image2Array(imageURL, onLoadCallback) {
    let img = new Image();
    // console.log(imageURL);
    img.onload = function(){
        const [ w , h ] = [ img.width , img.height ]
        canvas.width = w;
        canvas.height = h;
        // console.log(`Getting canvas context: w = ${w} , h = ${h}`);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0); // Or at whatever offset you like
        // console.log("Drawing image to context");
        ctx.drawImage(img, 0, 0);
        // console.log("Getting image data");
        const imgArray = ctx.getImageData(0, 0, img.width, img.height).data;
        const dims = { 
            height: h,
            width: w,
            depth: imgArray.length / w / h,
        };
        onLoadCallback(imgArray, dims);
    };
    img.src = imageURL;
}

function array2Image(imgArray, width, height) {
    // console.log(imgArray);
    // console.log(width, height);
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    let iData = ctx.createImageData(width, height);
    iData.data.set(imgArray);
    ctx.putImageData(iData, 0, 0);
    return canvas.toDataURL();
}

function isValidIndex(i, l) {
    return 0 <= i <= l;
}

function isValidCoordinate(x, y, width, height) {
    return (
        0 <= x && x<=height
        &&
        0 <= y && y<=width
    );
}

function coordinate2Index(x, y, w, p) {
    return (x * w + y) * p;
}

function index2Coordinates(i, h, w, p) {
    i /= p;                                                                 // Make sure this is integer division.
    const x = i / h;
    const y = i - (x * w);
    return ( x , y );
}

function isSameGroup4(c1, c2) {
    // console.log("c1:", c1);
    // console.log("c2:", c2);
    return (
        ((
            Math.abs(c1[0] - c2[0]) +
            Math.abs(c1[1] - c2[1]) +
            Math.abs(c1[2] - c2[2])
        ) <= COLOR_EPSILON )
        &&
        ( Math.abs(c1[3] - c2[3]) <= ALPHA_EPSILON )
    );
}

function getColor4(i, imgArray) {
    return [
        imgArray[i],
        imgArray[i+1],
        imgArray[i+2],
        imgArray[i+3]
    ];
}

function getNeighbors(current, w, p) {
    return [
        current + p,
        current - p,
        current + p*w,
        current - p*w
    ];
}

function getGroupIndices4(i, imgArray, w) {
    const l = imgArray.length;
    const color = getColor4(i, imgArray);
    let visited = new Set();
    let group = [];
    let queue = [i];
    while (queue.length > 0) {
        let current = queue.pop();

        if (!isValidIndex(current, l)) continue;
        if (visited.has(current)) continue;
        visited.add(current);
        if (!isSameGroup4(color, getColor4(current, imgArray))) continue;

        group.push(current);
        // Written like this to improve performance.
        queue.push(current - 4*w);
        queue.push(current + 4*w);
        queue.push(current - 4);
        queue.push(current + 4);
    };
    return group;
}

function getImageGroups4(imgArray, h) {
    let groups = []
    let isGrouped = Array(Math.floor(imgArray.length / 4)).fill(false);
    for (let seed = 0; seed < isGrouped.length; seed++) {
        if (isGrouped[seed]) continue;
        let group = getGroupIndices4(seed*4, imgArray, h);
        for (const i of group) {
            isGrouped[Math.floor(i / 4)] = true;
        }
        groups.push(group);
    }
    groups.sort((a,b) => (b.length - a.length))
    return groups;
}

function setGroupColorInImage4(imgArray, group, color) {
    for (const i of group) {
        imgArray[i] = color[0];
        imgArray[i+1] = color[1];
        imgArray[i+2] = color[2];
        imgArray[i+3] = color[3];
    }
}

function setGroupInImage4(group, targetArray, sourceArray) {
    for (const i of group) {
        targetArray[i] = sourceArray[i];
        targetArray[i+1] = sourceArray[i+1];
        targetArray[i+2] = sourceArray[i+2];
        targetArray[i+3] = sourceArray[i+3];
    }
}
// -----------------------------------------------------------------------

// ------------------------------- EXPORTS -------------------------------
export {
    image2Array,
    array2Image,
    getImageGroups4,
    setGroupColorInImage4,
    setGroupInImage4,
};
// -----------------------------------------------------------------------


