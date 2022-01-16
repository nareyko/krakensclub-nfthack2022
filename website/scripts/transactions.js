const contractAddress = "0xD9b8Cd50b81aFE79645585EDE9A5a0A1791d22dC"

async function mint() {
    var slider = document.getElementById("mint-range");
    quantity = parseInt(slider.value)
    const web3 = await Moralis.enableWeb3();
    var user = Moralis.User.current();


    const options = {
        contractAddress: contractAddress,
        functionName: "publicMint",
        abi: ABI,
        awaitReceipt: false,

        params: {
            _quantity: quantity
        },
        msgValue: Moralis.Units.ETH(0.001 * quantity)
    };

    Moralis.executeFunction(options);

}

function transfermodal(token_id, nmax) {
    document.getElementById("token-id").value = token_id
    document.getElementById("transfer-id-span").innerHTML = token_id
    slider2.max = nmax
    slider2.value = 1
    output2.innerHTML = 1;

    showModal('transfer-modal')
}

function powermodal(token_id) {
    document.getElementById("token-id").value = token_id
    document.getElementById("power-id-span").innerHTML = token_id
    showModal('power-modal')
}

function swapmodal(token_id) {
    document.getElementById("token-id").value = token_id
    document.getElementById("swap-id-span").innerHTML = token_id
    showModal('swap-modal')
}

function mysticmodal(token_id) {
    document.getElementById("token-id").value = token_id
    document.getElementById("mystic-id-span").innerHTML = token_id
    showModal('mystic-modal')
}

async function transfernft() {
    const web3 = await Moralis.enableWeb3();
    var user = Moralis.User.current();
    var token_id = document.getElementById("token-id").value
    var to_address = document.getElementById("transfer-address").value
    quantity = parseInt(slider2.value)
    console.log(token_id, quantity, to_address)

    // sending 15 tokens with token id = 1
    const options = {
        type: "erc1155",
        receiver: to_address,
        contractAddress: contractAddress,
        tokenId: token_id,
        amount: quantity
    }
    let result = await Moralis.transfer(options)

}

async function swapnft() {
    var token_id1 = document.getElementById("token-id").value
    var token_id2 = document.getElementById("swap-id").value
    console.log(token_id1, token_id2)
    const web3 = await Moralis.enableWeb3();
    var user = Moralis.User.current();


    const options = {
        contractAddress: contractAddress,
        functionName: "swap",
        abi: ABI,
        awaitReceipt: false,

        params: {
            _tokenid1: token_id1,
            _tokenid2: token_id2,

        },
    };

    Moralis.executeFunction(options);

}

async function powernft() {
    var token_id1 = document.getElementById("token-id").value
    var token_id2 = document.getElementById("power-id").value
    console.log(token_id1, token_id2)

    const web3 = await Moralis.enableWeb3();
    var user = Moralis.User.current();


    const options = {
        contractAddress: contractAddress,
        functionName: "power",
        abi: ABI,
        awaitReceipt: false,

        params: {
            _tokenid1: token_id1,
            _tokenid2: token_id2,

        },
    };

    Moralis.executeFunction(options);

}

async function mysticnft() {
    var token_id1 = document.getElementById("token-id").value
    var token_id2 = document.getElementById("mystic-id").value
    console.log(token_id1, token_id2)

    const web3 = await Moralis.enableWeb3();
    var user = Moralis.User.current();


    const options = {
        contractAddress: contractAddress,
        functionName: "mystic",
        abi: ABI,
        awaitReceipt: false,

        params: {
            _tokenid1: token_id1,
            _tokenid2: token_id2,

        },
    };

    Moralis.executeFunction(options);

}