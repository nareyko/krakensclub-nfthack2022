const serverUrl = "https://taihfzuxq6ku.usemoralis.com:2053/server";
const appId = "uFaaUF3LgLIFm8vWYwHAGgt7kRiU5Ba4Ww1j4kSi";
Moralis.start({ serverUrl, appId });
// Moralis.settings.setAPIRateLimit({
//     anonymous: 100,
//     authenticated: 100,
//     windowMs: 60000
// })

const options_chain = {
    chain: "mumbai"
}
const tokens_options = {
    chain: "mumbai",
    token_address: "0xD9b8Cd50b81aFE79645585EDE9A5a0A1791d22dC",
}

async function transfer() {
    const web3 = await Moralis.enableWeb3();
    const options = { type: "native", amount: Moralis.Units.ETH("0.5"), receiver: "0x6ede162be75c8b61be5ed3ef721acdfa48fb47c9" }
    let result = await Moralis.transfer(options)
}

var e_disconnected = document.getElementsByClassName("wallet-disconnected");
var e_connected = document.getElementsByClassName("wallet-connected");
var linked_address = document.getElementById('linked-address');
var nft_panel = document.getElementById('nft-panel');
var nft_list = document.getElementById('nft-list');

function elements2display(e, v) {
    var i;
    for (i = 0; i < e.length; i++) {
        e[i].style.display = v;
    }
}

var tokenlist = new Array();

function renderPanels() {
    tokenlist.length = 0;
    _renderPanels();
}

async function _renderPanels() {
    var user = Moralis.User.current();
    if (!user) {
        elements2display(e_connected, 'none')
        elements2display(e_disconnected, 'block')
    } else {
        elements2display(e_disconnected, 'none')
        elements2display(e_connected, 'block')
        const balance = await Moralis.Web3API.account.getNativeBalance(options_chain);
        const balance_matics = Math.round(balance.balance / 1000000000000000000 * 100) / 100;
        linked_address.innerHTML = user.get("ethAddress") + " (" + balance_matics.toString() + " MATIC)";
        const polygonNFTs = await Moralis.Web3API.account.getNFTs(tokens_options);
        console.log(polygonNFTs)
        nft_list.innerHTML = ""
        if (!polygonNFTs || polygonNFTs.total == 0) {
            nft_panel.style.display = "none";
        } else {
            nft_panel.style.display = "block";
            // if (false) {
            polygonNFTs.result.sort((a, b) => (parseInt(a.token_id) > parseInt(b.token_id) ? 1 : -1))
            for (var r in polygonNFTs.result) {
                const request = new XMLHttpRequest();
                console.log(polygonNFTs.result[r])
                request.token_id = polygonNFTs.result[r].token_id;
                request.token_uri = polygonNFTs.result[r].token_uri;
                request.amount = polygonNFTs.result[r].amount;
                request.open('GET', request.token_uri + ".json", false);

                // request.responseText = 'json';
                request.onload = function() {
                    // Convert JSON data to an object 
                    let data = JSON.parse(this.responseText);
                    // console.log(data)
                    ifpsfilename = data.image
                        // console.log(ifpsfilename)
                        // console.log(this.responseText)
                    if (this.token_id > 99) {
                        nft_list.innerHTML += `<div class="w3-third w3-padding">
                    <div class="w3-card-4 w3-white w3-padding"><div id="token-` + this.token_id + `" class="w3-container w3-center">
                    <img src="` + ifpsfilename + `" style="max-width:100%">
                    <h2>` + data.name + `</h2>
                    <button class="w3-button w3-red w3-margin-top" onclick="powermodal(` + this.token_id + `)">Power</button>
                    <button class="w3-button w3-gray w3-margin-top" onclick="swapmodal(` + this.token_id + `)">Swap</button>
                    <button class="w3-button w3-yellow w3-margin-top" onclick="mysticmodal(` + this.token_id + `)">Mystic</button>
                    <button class="w3-button w3-orange w3-margin-top" onclick="transfermodal(` + this.token_id + `, ` + this.amount + `)">Transfer</button>
                    </div></div></div>
                    `
                    } else {
                        nft_list.innerHTML += `<div class="w3-third w3-padding">
                    <div class="w3-card-4 w3-white w3-padding"><div id="token-` + this.token_id + `" class="w3-container w3-center">
                    <img src="` + ifpsfilename + `" style="max-width:100%">
                    <h2>Amount:` + this.amount + `</h2>
                    <button class="w3-button w3-orange w3-margin-top" onclick="transfermodal(` + this.token_id + `, ` + this.amount + `)">Transfer</button>
                    </div></div></div>
                    `
                    }
                }
                request.send();

                const request2 = new XMLHttpRequest();
                request2.token_id = polygonNFTs.result[r].token_id;
                request2.token_uri = polygonNFTs.result[r].token_uri;
                // request2.open('GET', "https://api.opensea.io/api/v1/asset/" + tokens_options.token_address + "/" + polygonNFTs.result[r].token_id + "/");
                request2.open('GET', "https://api.opensea.io/api/v1/asset/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/" + polygonNFTs.result[r].token_id + "/");
                request2.send();
                // request.responseText = 'json';
                request2.onload = function() {
                    // Convert JSON data to an object 
                    let data = JSON.parse(this.responseText);
                    // console.log(data)
                    tokeninfo = document.getElementById("token-" + this.token_id);
                    lastbid = data.orders[data.orders.length - 1].base_price / 1e18
                    tokeninfo.innerHTML += `<hr>
                    <a class="w3-button w3-blue" href="` + data.permalink + `" style="max-width:90%;" target="_blank"><img src="https://opensea.io/static/images/logos/opensea.svg" style="width:40px"> bid: ` + lastbid + `</a>
                    `
                }


            }
        }
    }
}

renderPanels();

/* Authentication code */
async function wallet_login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
            .then(function(user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    renderPanels()
}

async function wallet_logout() {
    await Moralis.User.logOut();
    console.log("logged out");
    renderPanels()
}

var slider = document.getElementById("mint-range");
var output = document.getElementById("mint-count");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

var slider2 = document.getElementById("transfer-range");
var output2 = document.getElementById("transfer-count");
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
    output2.innerHTML = this.value;
}