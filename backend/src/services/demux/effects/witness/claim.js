function claim(state, payload, blockInfo, context) {
  const claim = {
    claimant: payload.data.claimant,
    category: payload.data.category,
    content: payload.data.content,
    witnesses: payload.data.witnesses
  };
  context.socket.emit("claim", claim);
}

export default claim;
