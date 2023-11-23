//first we need to sort the array..?

function mergeSort(a) {
    if (a.length < 2) {
        return a;
        }
    const middle = Math.floor(a.length/2);
    const leftHalf = mergeSort(a.slice(0, middle));
    const rightHalf = mergeSort(a.slice(middle));

    return mergeSides(leftHalf, rightHalf);
};

function mergeSides(leftHalf, rightHalf) {
    const merged = [];

    while (leftHalf.length > 0 && rightHalf.length > 0) {
        if (leftHalf[0] < rightHalf[0]) {
            merged.push(leftHalf[0]);
            leftHalf.shift();
        } else {
            merged.push(rightHalf[0]);
            rightHalf.shift();
        }
    }

    while (leftHalf.length > 0) {
        merged.push(leftHalf[0]);
        leftHalf.shift();
    }

    while (rightHalf.length > 0) {
        merged.push(rightHalf[0]);
        rightHalf.shift();
    }

    return merged;
};

//create the tree from the sorted array

class Node {
    constructor(data = null, leftChild = null, rightChild = null) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
};

class Tree {
    constructor(array) {
        this.sortedArray = mergeSort(array);
        this.root = this.buildTree(this.sortedArray);//return value from buildTree;
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;
        const mid = Math.floor((sortedArray.length)/2);
        const root = new Node(sortedArray[mid]);
        
        const leftSubtree = sortedArray.slice(0, mid);
        const rightSubtree = sortedArray.slice(mid + 1);

        root.leftChild = this.buildTree(leftSubtree);
        root.rightChild = this.buildTree(rightSubtree);
    
        return root
    };

    insert(value) {
        let newNode = new Node(value)
        let currentNode = this.root;

        while (currentNode.leftChild !== null || currentNode.rightChild !== null) {
            if (currentNode.data === value) return;
            if (currentNode.data > value) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
        }
        if (currentNode.value > value) {
            currentNode.leftChild = newNode;
        } else {
            currentNode.rightChild = newNode;
        }
    };

    delete(value) {
        let currentNode = this.root;

        //first, find the right node;
        if (currentNode.data === value) return;
        while (currentNode.data !== value) {
            if (currentNode.leftChild === null || currentNode.rightChild === null) return;
            if (currentNode.data > value) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
        }
        console.log(currentNode);

        //if no child nodes...


        //if one child node...

        //if 2 child nodes...
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.rightChild !== null) {
          this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
          this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
};

let testArray = [4, 43, 19, 14, 2, 6, 9, 11, 54, 82, 23, 76, 99, 100, 101];

let newTree = new Tree(testArray);
console.log(newTree.root)
console.log(newTree);
newTree.prettyPrint();


