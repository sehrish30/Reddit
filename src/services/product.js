import { productsRef } from "../firebase";

const addUpVote = ({ user, productId }) => {
  if (!user) return Promise.reject();

  return productsRef
    .doc(productId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const previousVotes = data.votes;
        const vote = { votedBy: { id: user.uid, name: user.displayName } };
        const updatedVotes = [...previousVotes, vote];
        const voteCount = updatedVotes.length;
        productsRef.update({ votes: updatedVotes, voteCount });

        return {
          ...data,
          votes: updatedVotes,
          voteCount: voteCount,
        };
      }
    });
};

export default { addUpVote };
