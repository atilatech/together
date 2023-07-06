let { address, tokenId } = props;
State.init({
  loading: false,
  token: {},
  error: null,
});

const alchemyApiKey = props.alchemyApiKey || "docs-demo";

const loadNFT = () => {
  State.update({ loading: true });
  const options = { method: "GET", headers: { accept: "application/json" } };
  const nfts = fetch(
    `https://eth-goerli.g.alchemy.com/nft/v2/${alchemyApiKey}/getNFTsForCollection?contractAddress=${address}&withMetadata=true&startToken=${tokenId}&limit=1`,
    options
  );
  console.log("nft", nfts);

  State.update({ token: nfts.body.nfts[0] });
  console.log("state.token", state.token);
  State.update({ loading: false });
};

loadNFT();

return (
  <div className="EventDetail container card shadow my-5 p-5">
    {state.loading && (
      <>
        <p className="text-primary">Loading NFT details...</p>
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
    {state.token && (
      <>
        <h1 className="text-center mb-3">{state.token.title}</h1>
        <div className="container">
          <div className="card shadow-sm">
            <img
              src={state.token.media[0].gateway}
              width={300}
              alt={state.token.title}
            />
            <div className="card-body">
              <p className="card-text">
                <a
                  href={`https://testnets.opensea.io/assets/goerli/${address}/${tokenId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View NFT on Opensea
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    )}
    <hr />
    <Widget src="tomiwa1a1.near/widget/TransferNFT" props={props} />
  </div>
);
