const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    let signer = ethers.Wallet.createRandom();
    while (signer.address >= "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") {
      signer = ethers.Wallet.createRandom();
    }
    ethers.provider.getSigner(0).sendTransaction({
      to: signer.address,
      value: ethers.utils.parseEther("10")
    });

    await game.connect(signer.connect(ethers.provider)).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
