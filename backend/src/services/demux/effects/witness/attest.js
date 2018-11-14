function attest(state, payload, blockInfo, context) {
  const attest = {
    timestamp: payload.data.timestamp,
    user: payload.data.user,
    review: payload.data.review,
    rating: payload.data.rating,
    ipfs_path: payload.data.ipfs_path
  };
  context.socket.emit("attest", attest);
}

export default attest;
