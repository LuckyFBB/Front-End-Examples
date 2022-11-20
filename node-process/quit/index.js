// function findRightNode(node) {
//     if (!node.right) {
//         console.log('no right child node', process.pid)
//         process.exit(1)
//     }
//     console.log("This is findRightNode function")
// }

// findRightNode({ left: 1 })

// function findRightNode(node) {
//     process.on("uncaughtException", (error) => {
//         console.log(1111)
//         console.error(error);
//         process.exit(1);
//     });
//     if (!node.right) {
//         console.log('no right child node', process.pid)
//         throw new Error('no right child node')
//     }
//     console.log("This is findRightNode function")
// }

// findRightNode({ left: 1 })

// try {
//     findRightNode({ left: 1 })
// } catch (error) {
//     console.log("hi, catch now")
// }

async function findRightNode(node) {
    // process.on("unhandledRejection", (error) => {
    //     console.log(1111)
    //     console.error(error);
    //     // process.exit(1);
    // });
    process.on("exit", (code, signal) => {
        console.log(2222, code, signal)
    })
    // if (!node.right) {
    // console.log('no right child node', process.pid)
    throw new Error("no right child node!")
    // }
    // console.log("This is findRightNode function")
}
findRightNode({ left: 1 })