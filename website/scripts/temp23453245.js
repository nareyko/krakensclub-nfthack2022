// const getProvider = async() => {
//     if ("solana" in window) {

//         // opens wallet to connect to
//         await window.solana.connect();

//         const provider = window.solana;
//         if (provider.isPhantom) {
//             console.log("Is Phantom installed?  ", provider.isPhantom);
//             return provider;
//         }
//     } else {
//         window.open("https://www.phantom.app/", "_blank");
//     }
// };

// async function connectPhantom() {
//     var provider = await getProvider();
//     console.log("Public key of the emitter: ", provider.publicKey.toString());
//     try {
//         const resp = await window.solana.connect();

//         connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
//         connection.getBalance(resp.publicKey).then(function(value) { console.log(value); })
//         recieverWallet = new solanaWeb3.PublicKey("CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ");
//         transaction = new solanaWeb3.Transaction().add(
//             solanaWeb3.SystemProgram.transfer({
//                 fromPubkey: resp.publicKey,
//                 toPubkey: recieverWallet,
//                 lamports: solanaWeb3.LAMPORTS_PER_SOL / 100,
//             }),
//         );
//         transaction.feePayer = await provider.publicKey;
//         let blockhashObj = await connection.getRecentBlockhash();
//         transaction.recentBlockhash = await blockhashObj.blockhash;

//         if (transaction) {
//             console.log("Txn created successfully");
//         }
//         let signed = await provider.signTransaction(transaction);
//         signature = await solanaWeb3.sendTransaction(
//             connection,
//             transaction
//         );
//         console.log('SIGNATURE', signature);
//     } catch (err) {
//         console.log('User rejected the request.');
//     }
// }

// get wallet provider, phantom

// var acc = document.getElementsByClassName("faq");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }

function generateKraken(x1, x2, x3, x4) {
    var h = Math.floor(Math.random() * 360)
    var s = Math.floor(Math.random() * 20 + 80)
    var v = Math.floor(Math.random() * 20 + 80)
    var delta = Math.floor(Math.random() * 150 + 15)
    var colors = []
    colors.push(HSVToHEX(h, s, v))
    h = (h + delta) % 360
    colors.push(HSVToHEX(h, s, v))
    h = (h + delta) % 360
    colors.push(HSVToHEX(h, s, v))

    colors = randomize(colors)
    x1.style.backgroundColor = colors[0]
    x2.style.backgroundColor = colors[1]
    x3.style.backgroundColor = colors[2]
    if (Math.random() < 0.5) {
        colors.push('white')
    } else {
        colors.push('#444')
    }
    x4.style.backgroundColor = colors[3]
}




HSVToHEX = function(h, s, v) {

    var rgb = {};
    var h = Math.round(h);
    var s = Math.round(s * 255 / 100);
    var v = Math.round(v * 255 / 100);

    if (s == 0) {

        rgb.r = rgb.g = rgb.b = v;
    } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;

        if (h == 360) h = 0;

        if (h < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3
        } else if (h < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3
        } else if (h < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3
        } else if (h < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3
        } else if (h < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3
        } else if (h < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3
        } else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0
        }
    }
    r = Math.round(rgb.r).toString(16);
    g = Math.round(rgb.g).toString(16);
    b = Math.round(rgb.b).toString(16);
    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;

};

function randomize(inputArr) {
    var results = [];
    while (inputArr.length > 0) {
        pos = Math.floor(Math.random() * inputArr.length)
        results.push(inputArr[pos])
        inputArr.splice(pos, 1)
    }
    return results
}

function generateKrakens() {
    var elements = document.getElementsByClassName("maskimage")

    for (var i = 0; i < elements.length; i = i + 4) {
        generateKraken(elements[i], elements[i + 1], elements[i + 2], elements[i + 3])
    }
}
// generateKrakens()

// var slideIndex = 0;
// carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "inline";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}