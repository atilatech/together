let { title, description, image, address, tokenId } = props;
State.init({
  showLogin: true,
  destination: props.destination,
  transactionHash: null,
  error: null,
});

const transferNFT = () => {
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/master/src/artifacts/contracts/NFT.sol/NFT.json"
  );

  console.log("nftABI", nftABI);

  const sender = Ethers.send("eth_requestAccounts")[0];
  console.log("sender", sender);
  if (!sender) {
    State.update({ error: "Please login first" });
    return;
    console.log("Please login first");
    // window.ethereum.send("eth_requestAccounts");
    console.log(" window.ethereum.send");
  } else {
    State.update({ error: "" });
  }

  const signer = Ethers.provider().getSigner();

  const contractAbi = JSON.parse(nftABI.body);
  console.log("sender, signer, contractAbi", { sender, signer, contractAbi });
  const nftContract = new ethers.Contract(address, contractAbi.abi, signer);
  console.log({ nftContract });

  nftContract["safeTransferFrom(address,address,uint256)"](
    signer.getAddress(),
    state.destination,
    Number.parseInt(tokenId)
  ).then((transactionHash) => {
    console.log("NFT transferred successfully!");

    console.log("Transaction Hash:", transactionHash);
    State.update({ transactionHash: transactionHash });
    console.log(
      "Transaction URL:",
      `https://goerli.etherscan.io/tx/${transactionHash}`
    );
  });
};

const transferButton = (
  <button className="btn btn-primary m-3" onClick={() => transferNFT()}>
    Transfer NFT
  </button>
);

const setDestinationAddress = (value) => {
  State.update({ destination: value });
};

const loginButton = (
  <Web3Connect
    className="FormSubmitContainer"
    connectLabel={web3connectLabel}
    onConnect={(provider) => {
      console.log("provider", provider);
      State.update({ provider });
    }}
  />
);

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h1 className="text-center mb-3">{title} abc</h1>
    <div className="container">
      <div className="card shadow-sm">
        <img src={image} width={300} alt={title} />

        <div className="card-body">
          <p className="card-text">{description}</p>

          <input
            type="text"
            placeholder="Enter Destination Address"
            value={state.destination}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />
          {transferButton}
          {transactionHash && (
            <p className="text-success">
              Transfer was succesful!
              <a href={`https://goerli.etherscan.io/tx/${transactionHash}`}>
                View Transaction
              </a>
            </p>
          )}
          {transactionHash && (
            <p className="text-success">
              Transfer was succesful!
              <a href={`https://goerli.etherscan.io/tx/${transactionHash}`}>
                View Transaction
              </a>
            </p>
          )}
          <hr />
          {showLogin && loginButton}
        </div>
      </div>
    </div>
  </div>
);
