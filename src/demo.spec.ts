import { Address, OpenedContract, toNano } from "@ton/core";
import { ContractSystem, Treasure } from "@tact-lang/emulator";
import { did } from "./output/rns_did";

describe("did contract", () => {

  let system: ContractSystem;
  let contract: OpenedContract<did>;

  let owner: Treasure;
  let nonOwner: Treasure;

  beforeEach(async () => {
    
    system = await ContractSystem.create();
    owner = system.treasure("owner");
    nonOwner = system.treasure("non-owner");

    const ins = await did.fromInit(owner.address);
    contract = system.open(ins);
    system.name(contract.address, "main");


  });

  it("should deploy correctly", async () => {
    const track = system.track(contract);
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();
    expect(track.collect()).toMatchSnapshot();
  });

  it("should increment counter by owner", async () => {

    const track = system.track(contract);
    await contract.send(owner, { value: toNano(1) }, "increment");
    await system.run();

    expect(track.collect()).toMatchSnapshot();
    expect(await contract.getCounter()).toEqual(1n);

  });

  it("should not increment counter by non-owner", async () => {

    const track = system.track(contract);

    await contract.send(nonOwner, { value: toNano(1) }, "increment");
    await system.run();

    expect(track.collect()).toMatchSnapshot();
    expect(await contract.getCounter()).toEqual(0n);

  });
});
