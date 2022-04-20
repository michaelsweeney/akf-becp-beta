export const LoadingScreenError = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        verticalAlign: "middle",
        marginTop: 200,
        color: "gray",
        // border: "black solid 1px",
        // padding: 100,
      }}
    >
      <h4>
        Simulation configuration not found. Try selecting different parameters.
      </h4>
    </div>
  );
};
