let { address, tokenId } = props;

let currentTime = new Date().getTime() / 1000;

State.init({
  showLogin: false,
  destination: props.destination,
  expires: currentTime,
  transaction: null,
  loading: false,
  error: null,
});

const rentNFT = () => {
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/f69d581b5f6d14b1d9f0d85dbd488f6d7ebce01b/src/artifacts/contracts/RentableNFT.sol/RentableNFT.json"
  );

  console.log("nftABI", nftABI);

  const sender = Ethers.send("eth_requestAccounts")[0];
  console.log("sender", sender);
  if (!sender) {
    State.update({ error: "Please login first", showLogin: true });
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
  )
    .then((transaction) => {
      console.log("Transaction Hash:", transaction);
      State.update({ loading: true });
      transaction.wait().then(() => {
        console.log("NFT transferred successfully!");
        State.update({ transaction: transaction, loading: false });
        console.log(
          "Transaction URL:",
          `https://goerli.etherscan.io/tx/${transaction.hash}`
        );
      });
    })
    .catch((error) => {
      console.log("error", error);
      State.update({ error: error.reason || "Error occured in transaction" });
    });
};

const transferButton = (
  <button
    className="btn btn-primary m-3"
    onClick={() => rentNFT()}
    disabled={state.loading}
  >
    Transfer NFT
  </button>
);

const setExpires = (seconds) => {
  currentTime = new Date().getTime() / 1000;
  const expirationTime = currentTime + seconds; // Convert minutes to seconds
  State.update({ expires: expirationTime });
};

const expiresButtons = (
  <div>
    <button
      className="btn btn-outline-primary m-3"
      onClick={() => setExpires(60)}
    >
      1 Minute
    </button>
    <button
      className="btn btn-outline-primary m-3"
      onClick={() => setExpires(300)}
    >
      5 Minutes
    </button>
    <button
      className="btn btn-outline-primary m-3"
      onClick={() => setExpires(600)}
    >
      10 Minutes
    </button>
  </div>
);

const humanReadableDate = new Date(state.expires * 1000).toLocaleString();
console.log({ humanReadableDate });

const expiresSection = (
  <div>
    <label>Rental will expire in: {humanReadableDate}</label>
    {expiresButtons}
  </div>
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
    <h3 className="text-center mb-3">Transfer NFT</h3>
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <label className="mb-1">Destination Address</label>
          <input
            type="text"
            placeholder="Enter Destination Address"
            value={state.destination}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />
          {expiresSection}
          {transferButton}
          {transactionHash && (
            <p className="text-success">
              Transfer was succesful!
              <a href={`https://goerli.etherscan.io/tx/${transactionHash}`}>
                View Transaction
              </a>
            </p>
          )}
          {state.loading && (
            <>
              <p className="text-primary">Loading transaction...</p>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </>
          )}
          {state.transaction && (
            <p className="text-success">
              Transfer was succesful!
              <a
                href={`https://goerli.etherscan.io/tx/${state.transaction.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            </p>
          )}
          {state.error && <p className="text-danger">{state.error}</p>}
          <hr />
          {state.showLogin && loginButton}
        </div>
      </div>
    </div>
  </div>
);
