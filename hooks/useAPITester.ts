import { useEffect } from "react";
import {
  createReactionSpace,
  getReactionSpaces,
  getReactionSpaceDetail,
  addUserReaction,
  removeUserReaction,
  getStickerPacks,
  getStickerPackDetail,
  getReactionPacks,
  getReactionPackDetail,
  getUserReactions,
} from "@livelike/javascript";

export function useAPITester() {
  useEffect(() => {
    async function apiTest() {
      //   const stickerPacks = await getStickerPacks();
      //   console.log("stickerPacks", stickerPacks.results[0].stickers);
      // const stickerDetails = await getStickerPackDetail({
      //   stickerPackId: "62883615-ccf9-4c7d-b996-a04e07e44ff2",
      // });
      // console.log("stickerPacks detail", stickerDetails);
      // const reactionPacks = await getReactionPacks();
      // console.log("reactionPacks", reactionPacks.results[0]);
      // const reactionSpace = await createReactionSpace({
      //   targetGroupId: "a",
      //   reactionPackIds: ["5fac4fb8-9bcd-43d1-a159-5385bbbb1ee0"],
      // });
      // console.log("reactionSpace", reactionSpace);
      // const reactionSpaces = await getReactionSpaces();
      // console.log("reactionSpaces", reactionSpaces.results[0].id);
      // const reactionSpaceDetail = await getReactionSpaceDetail({
      //   targetGroupId: "a",
      // });
      // console.log("reactionSpaces", reactionSpaceDetail.reaction_pack_ids[0]);
      // const reactionPackdetails = await getReactionPackDetail({
      //   reactionPackId: "5fac4fb8-9bcd-43d1-a159-5385bbbb1ee0",
      // });
      // console.log(reactionPackdetails);
      // const userReaction = await addUserReaction({
      //   reactionSpaceId: "21195f40-882b-4f4f-a650-a9fca9b08801",
      //   reactionId: "388cdd37-180e-43cd-995f-b6c38cb4236d",
      //   targetId: "first-a",
      // });
      // console.log("userReaction", userReaction);
      // console.log(
      //   await getUserReactions({
      //     reactionSpaceId: "21195f40-882b-4f4f-a650-a9fca9b08801",
      //     reactionId: "388cdd37-180e-43cd-995f-b6c38cb4236d",
      //   })
      // );
      // console.log(
      //   await removeUserReaction({
      //     reactionSpaceId: "21195f40-882b-4f4f-a650-a9fca9b08801",
      //     userReactionId: "d24f551e-6bb9-4387-b039-1a4be320a37e",
      //   })
      // );
      // console.log(
      //   await getUserReactions({
      //     reactionSpaceId: "21195f40-882b-4f4f-a650-a9fca9b08801",
      //     reactionId: "388cdd37-180e-43cd-995f-b6c38cb4236d",
      //   })
      // );
    }
    apiTest()
      .then(() => {
        console.log("api tester ran successful");
      })
      .catch((e) => {
        console.error("Error in api tester", e);
      });
  }, []);
}
