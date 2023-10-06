State.init({
  items: [
    {
      loading: false,
      error: null,
      transaction: null,
      groupPurchaseCount: 2,
      groupPurchaseThreshold: 3,
      currentUserPurchased: false,
      ticketsReleased: false,
      title: "AfroFuturism Concert",
      image:
        "https://nmaahc.si.edu/sites/default/files/event-images/2023-06/DgByy5q0Kma67kt-kSB8vaYw.jpg",
    },
    {
      loading: false,
      error: null,
      transaction: null,
      groupPurchaseCount: 2,
      groupPurchaseThreshold: 4,
      currentUserPurchased: false,
      ticketsReleased: false,
      title: "African Safari Trip",
      image:
        "https://blog.thomascook.in/wp-content/uploads/2018/04/Ultimate-Kruger-Safari.jpg",
    },
  ],
  showLogin: true,
  error: false,
});

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

const purchase = (index) => {
  const sender = Ethers.send("eth_requestAccounts")[0];
  console.log("sender", sender);
  if (!sender) {
    State.update({ error: "Please login first", showLogin: true });
    return;
  } else {
    State.update({ error: "" });
  }

  const message = `Buy item: ${state.items[index].title}`;
  const signer = Ethers.provider().getSigner();
  signer.signMessage(message).then((signature) => {
    console.log({ message, signature, ethers });
    console.log(
      "ethers.utils.verifyMessage(message, signature)",
      ethers.utils.verifyMessage(message, signature)
    );
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    console.log({ signerAddress, sender });
    const itemsToUpdate = state.items;
    itemsToUpdate[index].currentUserPurchased = true;
    itemsToUpdate[index].groupPurchaseCount += 1;
    State.update({ items: itemsToUpdate });
  });
};

const release = (index) => {
  const itemsToUpdate = state.items;
  itemsToUpdate[index].ticketsReleased = true;
  State.update({ items: itemsToUpdate });
};

const leaveOrder = (index) => {
  const itemsToUpdate = state.items;
  itemsToUpdate[index].currentUserPurchased = false;
  itemsToUpdate[index].groupPurchaseCount -= 1;
  State.update({ items: itemsToUpdate });
};

const renderPurchaseActions = (item, index) => (
  <>
    {item.ticketsReleased && (
      <div class="alert alert-success my-1" role="alert">
        Your tickets have been released! Check your blockchain wallet for your
        NFT ticket.
      </div>
    )}
    {item.currentUserPurchased ? (
      <>
        <p>
          You are part of this group purchase. Would you like to leave or find
          more users to release the tickets?
        </p>

        {item.groupPurchaseCount < item.groupPurchaseThreshold ? (
          <>
            <p>
              {item.groupPurchaseThreshold - item.groupPurchaseCount} more users
              required to purchase tickets before tickets are released
            </p>
            <button
              className="btn btn-danger m-3"
              onClick={() => leaveOrder(index)}
              disabled={
                item.loading ||
                item.groupPurchaseCount === item.groupPurchaseThreshold
              }
            >
              Leave Group Order
            </button>
          </>
        ) : (
          <>
            {!item.ticketsReleased && (
              <button
                className="btn btn-success m-3"
                onClick={() => release(index)}
                disabled={item.loading}
              >
                Release Tickets
              </button>
            )}
          </>
        )}
      </>
    ) : (
      <>
        {item.groupPurchaseCount < item.groupPurchaseThreshold && (
          <>
            <button
              className="btn btn-primary m-3"
              onClick={() => purchase(index)}
              disabled={
                item.loading ||
                item.groupPurchaseCount === item.groupPurchaseThreshold
              }
            >
              Buy together with your friends - ($20)
            </button>
            <button
              className="btn btn-secondary m-3"
              onClick={() => purchase(index)}
              disabled={item.loading}
            >
              Purchase individually at full price - ($30)
            </button>
          </>
        )}
      </>
    )}
  </>
);

return (
  <div className="Afrogether container card shadow my-5 p-5">
    <h3 className="text-center mb-3">AfroGether</h3>
    <p className="text-center mb-3">Buy things together with friends.</p>
    {state.error && <p className="text-danger">{state.error}</p>}
    {state.showLogin && (
      <>
        <hr />
        {loginButton}
      </>
    )}
    <div className="container">
      {state.items.map((item, index) => (
        <>
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h2 class="card-title">{item.title}</h2>
              <img
                key={index}
                className="card-img-top"
                style={{ width: "200px", height: "auto" }}
                src={item.image}
                alt="user"
              />
              <p className="card-text">
                {item.groupPurchaseCount} out of {item.groupPurchaseThreshold}{" "}
                friends have purchased tickets for the event.
              </p>

              {Array.from({ length: item.groupPurchaseCount }).map(
                (_, index) => (
                  <img
                    key={index}
                    className="img-thumbnail"
                    style={{ width: "50px", height: "50px" }}
                    src={`https://source.unsplash.com/random?sig=${index}`}
                    alt="user"
                  />
                )
              )}
              {renderPurchaseActions(item, index)}
            </div>
          </div>
        </>
      ))}
    </div>
  </div>
);
