//first we need to sort the array

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

    //insert new node into existing tree

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

    //delete node from tree

    delete(value) {
        let parentNode = this.findParent(value);
        let currentNode = this.find(value);

        //if no child nodes...
        
        if (currentNode.leftChild === null && currentNode.rightChild === null) {
            if (parentNode.leftChild.data === value) {
                parentNode.leftChild = null;
            }
            if (parentNode.rightChild.data === value) {
                parentNode.rightChild = null
            }
        };

        //if 2 child nodes... !!needs work to delete root node(there will be no parent node)
        
        if (currentNode.leftChild !== null && currentNode.rightChild !== null) {
            let nextHeighest = currentNode.rightChild;
            while (nextHeighest.leftChild !== null) {
                nextHeighest = nextHeighest.leftChild;
            }
            nextHeighest.leftChild = currentNode.leftChild;
            if (currentNode.rightChild !== nextHeighest) {
                let newParentNode = this.findParent(nextHeighest.data);
                newParentNode.leftChild = null;
                nextHeighest.rightChild = currentNode.rightChild;
            }
            if (parentNode.rightChild.data === value) {
                parentNode.rightChild = nextHeighest;
            } else {
                parentNode.leftChild = nextHeighest;
            }
        };

        //if one child node...

        if (currentNode.leftChild === null || currentNode.rightChild === null) {
            if (parentNode.rightChild === currentNode) {
                if (currentNode.rightChild === null) {
                    parentNode.rightChild = currentNode.leftChild;
                } else {
                    parentNode.rightChild = currentNode.rightChild;
                }
            } else {
                if (currentNode.rightChild === null) {
                    parentNode.leftChild = currentNode.leftChild;
                } else {
                    parentNode.leftChild = currentNode.rightChild;
                }
            }
        };
        
    }

    find(value) {
        let currentNode = this.root;

        if (currentNode.data === value) return;
        while (currentNode.data !== value) {
            if (currentNode.leftChild === null || currentNode.rightChild === null) return;
            if (currentNode.data > value) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
        }
        return currentNode;
    };

    findParent(value) {
        if (this.root.data === value) return;
        let parentNode = this.root;

        while (parentNode.leftChild.data !== value && parentNode.rightChild.data !== value) {
            if (parentNode.leftChild === null && parentNode.rightChild === null) return;
            if (parentNode.data > value) {
                parentNode = parentNode.leftChild;
            } else {
                parentNode = parentNode.rightChild;
            }
        };
        return parentNode;
    };

    levelOrder() {
        if (this.root === null) return;

        let levelOrderQueue = [];
        let currentNode = this.root;
        let queuePosition = 0

        levelOrderQueue.push(currentNode.data)

        while (queuePosition < levelOrderQueue.length) {
            if (currentNode == undefined) {
                queuePosition++;
                currentNode = this.find(levelOrderQueue[queuePosition]);
            } else {
                if (currentNode.leftChild !== null) {
                    levelOrderQueue.push(currentNode.leftChild.data);
                };
                if (currentNode.rightChild !== null) {
                    levelOrderQueue.push(currentNode.rightChild.data);
                };
                queuePosition++
                currentNode = this.find(levelOrderQueue[queuePosition])
            }
        }
        console.log(levelOrderQueue);
        return levelOrderQueue;
    };

    inOrder(current = this.root, inOrderList = []) {
        if (!current) return;
        if (current) {
            this.inOrder(current.leftChild, inOrderList);
            inOrderList.push(current.data);
            this.inOrder(current.rightChild, inOrderList);
        }
        return inOrderList;
    };

    preOrder(current = this.root, preOrderList = []) {
        if (!current) return;
        if (current) {
            preOrderList.push(current.data);
            this.preOrder(current.leftChild, preOrderList);
            this.preOrder(current.rightChild, preOrderList);
        }
        return preOrderList;
    }

    postOrder(current = this.root, postOrderList = []) {
        if (!current) return;
        if (current) {
            this.postOrder(current.leftChild, postOrderList);
            this.postOrder(current.rightChild, postOrderList);
            postOrderList.push(current.data);
        }
        return postOrderList;
    };

    height(givenNumber) {
        let node = this.find(givenNumber);
        if (!node) return;
        if(node) {

        }
        console.log(node)
    };

    depth(givenNumber) {
        let nodeDepth = -1;
        let node = this.find(givenNumber);
        if (!node) return;
        if (node) {
            while (node !== undefined) {
                node = this.findParent(node.data)
                nodeDepth++
            }
            return nodeDepth
        }
    };

    isBalanced() {
        //check if the tree is balanced (difference in height of left and right subtrees shouldnt be more then 1)
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

let testArray = [4, 43, 19, 14, 2, 6, 8, 11, 44, 52, 54, 23, 76, 100, 101];

let newTree = new Tree(testArray);
newTree.prettyPrint();
console.log(newTree.inOrder())
newTree.depth(8);
console.log(newTree.depth(19))
newTree.levelOrder();