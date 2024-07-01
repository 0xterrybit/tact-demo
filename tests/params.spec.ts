import { Builder, Slice, Cell, Address, beginCell } from '@ton/core';
import { storeSendParameters, loadSendParameters, SendParameters } from '../src/output/rns_did';
import { ContractSystem } from '@tact-lang/emulator';

describe('SendParameters serialization and deserialization', () => {

    
  it('should store and load SendParameters correctly', async () => {

    let  system = await ContractSystem.create();
    let owner = system.treasure("owner");
    
    // 创建一个 SendParameters 对象
    const sendParameters: SendParameters = {
      $$type: 'SendParameters',
      bounce: true,
      to: owner.address, 
      value: 1000n,
      mode: 1n,
      body: beginCell().storeUint(1, 32).endCell(),
      code: null,
      data: beginCell().storeUint(2, 32).endCell()
    };

    // 创建一个 Builder 对象
    const builder = new Builder();

    // 调用 storeSendParameters 函数
    storeSendParameters(sendParameters)(builder);

    // 获取生成的 Cell
    const cell = builder.endCell();

    // 解析 Cell 并验证内容
    const slice = cell.beginParse();

    const params = loadSendParameters(slice);
    expect(params.bounce).toBe(sendParameters.bounce);
    expect(params.to.equals(sendParameters.to)).toBe(true);
    expect(params.value).toBe(sendParameters.value);
    expect(params.mode).toBe(sendParameters.mode);
    expect(params.body?.equals(sendParameters.body!)).toBe(true);
    expect(params.code).toBe(sendParameters.code);
    expect(params.data?.equals(sendParameters.data!)).toBe(true);


  });
});
