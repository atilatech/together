State.init({
  items: [
    {
      loading: false,
      error: null,
      transaction: null,
      groupPurchaseCount: 2,
      groupPurchaseThreshold: 3,
      currentUserPurchased: true,
    },
    {
      loading: false,
      error: null,
      transaction: null,
      groupPurchaseCount: 2,
      groupPurchaseThreshold: 4,
      currentUserPurchased: false,
    },
  ],
});

const handlePurchase = (itemType) => {
  if (itemType === "item1") {
    State.update({ [item1.currentUserPurchased]: true });
  } else if (itemType === "item2") {
    State.update({ [item2.currentUserPurchased]: true });
  }
};

const renderPurchaseActions = (item) => (
  <>
    {item.currentUserPurchased ? (
      <>
        <p>
          You are part of this group purchase. Would you like to leave or find
          more users to release the tickets?
        </p>

        {item.groupPurchaseCount < item.groupPurchaseThreshold && (
          <>
            <p>
              {item.groupPurchaseThreshold - item.groupPurchaseCount} more users
              required to purchase tickets before tickets are released
            </p>
            <button
              className="btn btn-danger m-3"
              onClick={() => handlePurchase("item1")}
              disabled={
                item.loading ||
                item.groupPurchaseCount === item.groupPurchaseThreshold
              }
            >
              Leave Group Order
            </button>
          </>
        )}
      </>
    ) : (
      <>
        <button
          className="btn btn-primary m-3"
          onClick={() => handlePurchase("item1")}
          disabled={
            state.loading ||
            state.groupPurchaseCount === state.groupPurchaseThreshold
          }
        >
          Buy together with your friends - ($20)
        </button>
        <button
          className="btn btn-secondary m-3"
          onClick={() => handlePurchase("item2")}
          disabled={state.loading}
        >
          Purchase individually at full price - ($30)
        </button>
      </>
    )}
  </>
);

return (
  <div className="Afrogether container card shadow my-5 p-5">
    <h3 className="text-center mb-3">AfroGether</h3>
    <p className="text-center mb-3">Buy things together with friends.</p>
    <div className="container">
      {state.items.map((item, index) => (
        <>
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <p>
                Item {index + 1}: {item.groupPurchaseCount} out of{" "}
                {item.groupPurchaseThreshold} users have purchased tickets for
                the event.
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
              {renderPurchaseActions(item)}
            </div>
          </div>
        </>
      ))}
    </div>
  </div>
);
