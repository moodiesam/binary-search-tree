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

//remove doubles

function removeDoubles(array) {
    let numberA = 0;
    let numberB = 1;

    while (numberB < array.length) {
        if (array[numberA] === array[numberB]) {
            array.splice(numberB, 1);
        } else {
            numberA++;
            numberB++;
        };
    }
    return array
}

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
        this.doublesRemoved = removeDoubles(this.sortedArray);
        this.root = this.buildTree(this.doublesRemoved);//return value from buildTree;
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
        if (this.find(value)) return;

        while (currentNode.leftChild || currentNode.rightChild) {
            if (currentNode.data === value) return;
            if (currentNode.data > value && currentNode.leftChild) {
                currentNode = currentNode.leftChild;
            } else if (currentNode.data < value && currentNode.rightChild) {
                currentNode = currentNode.rightChild;
            } else {
                break;
            }
        };
        if (currentNode.data > value) {
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
        }

        //if 2 child nodes... !!needs work to delete root node(there will be no parent node)
        
        else if (currentNode.leftChild !== null && currentNode.rightChild !== null) {
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
        }

        //if one child node...

        else if (currentNode.leftChild === null || currentNode.rightChild === null) {
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

    levelOrder(currentNode = this.root) {
        if (!currentNode) return;

        let levelOrderQueue = [currentNode];
        let result = []

        while (levelOrderQueue.length > 0) {
            result.push(currentNode.data);
            levelOrderQueue.splice(0, 1);
            if (currentNode.leftChild) {
                levelOrderQueue.push(currentNode.leftChild);
            }
            if (currentNode.rightChild) {
                levelOrderQueue.push(currentNode.rightChild);
            }
            currentNode = levelOrderQueue[0];
        };
        console.log(result)

        //find node in queue postion 0, add its children to the list, move forward one position
        //if no children, return
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

    height(node = this.root) {
        if (node === null) return -1;

        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);
        return Math.max(leftHeight, rightHeight) +1;
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
            console.log(nodeDepth)
            return nodeDepth
        }
    };

    isBalanced() {
        if (this.checkBalanced() !== -1) {
            console.log('Balanced')
        } else {
            console.log('Not Balanced!')
        }
    };

    checkBalanced(node = this.root) {
        //check if the tree is balanced (difference in height of left and right subtrees shouldnt be more then 1)
        if (!node) return 0;
        const leftBalance = this.checkBalanced(node.leftChild);
        const rightBalance = this.checkBalanced(node.rightChild);
        const difference = Math.abs(leftBalance - rightBalance);

        if (leftBalance === -1 || rightBalance === -1 || difference > 1) {
            return -1;
        } else {
            return Math.max(leftBalance,rightBalance) +1;
        }
    };

    rebalance() {
        let newArray = this.inOrder();
        this.root = this.buildTree(newArray);
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

const randomArray = (size) => {
    return Array.from({ length: size}, () => Math.floor(Math.random() * 100));
}

let newTree = new Tree(randomArray(16));

newTree.isBalanced();
newTree.levelOrder();
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
newTree.insert(144);
newTree.insert(154);
newTree.insert(110);
newTree.insert(155);
newTree.isBalanced()
newTree.rebalance();
newTree.isBalanced();
newTree.levelOrder();
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());