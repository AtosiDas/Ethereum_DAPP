var ContractABI = [
	{
		"inputs": [],
		"name": "deposite",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withDrawFunds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var ContractAddress = "0xc7171663f64D31b9D4F2Bbc919423ef7aCB82Ec3";
var loginbutton = document.getElementById("connect_to_metamask")
var useraddress = document.getElementById("accountaddress")
var depositeinput = document.getElementById("depositeeth")
var depositebutton = document.getElementById("depositebutton")
var withdrawinput = document.getElementById("withdraweth")
var withdrawbutton = document.getElementById("withdrawbutton")
var getbalancebutton = document.getElementById("getbalance")
var balance = document.getElementById("balance")

var address, web3, myContract


document.addEventListener("DOMContentLoaded", async ()=>{
    if(typeof window.ethereum !== "undefined"){
        console.log("Metamask is installed!")
        var accounts = await ethereum.request({method : "eth_requestAccounts"})
        console.log(accounts);

        web3 = new Web3(window.ethereum);
        console.log("Web3 is loaded", web3);

        myContract = new web3.eth.Contract(ContractABI, ContractAddress);
        alert("contract is loaded!");

		loginbutton.addEventListener("click",async()=>{
			var accounts =  await ethereum.request({method : "eth_requestAccounts"});
			address = accounts[0];
			useraddress.innerText =  address;


			useraddress.classList.remove("d-none");
			loginbutton.classList.add("d-none");

			console.log(accounts);
			console.logt(accounts[0]);
		});


		ethereum.on("accountsChanged", async function (accounts){
			var accounts =  await ethereum.request({method:"eth_requestAccounts"});
			address = accounts[0];
			useraddress.innerText = address;

		});

		depositebutton.addEventListener("click",()=>{
			console.log(depositeinput.value);
			myContract.methods.deposite().send({from: address,value: depositeinput.value},function (err,res){
				console.log(res);
			})
		})

		withdrawbutton.addEventListener("click",()=>{
			//console.log(depositeinput.value);
			myContract.methods.withdraw(withdrawinput.value).send({from: address},function (err,res){
				console.log(res);
			})
		})

		getbalancebutton.addEventListener("click",()=>{
			//console.log(depositeinput.value);
			myContract.methods.getbalance().call({from: address},function (err,res){
				console.log(res);
				balance.innerText = res;
			})
		})

    }else{
        alert("Please install metamask!")
    }
})