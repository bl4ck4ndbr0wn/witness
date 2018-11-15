function claim(state, payload, blockInfo, context) {
  console.log(payload.data);
  const claim = {
    timestamp: payload.data.timestamp,
    user: payload.data.user,
    category: payload.data.category,
    content: payload.data.content,
    ipfs_path: payload.data.ipfs_path,
    witnesses: payload.data.witnesses
  };
  context.socket.emit("claim", claim);
}

export default claim;
