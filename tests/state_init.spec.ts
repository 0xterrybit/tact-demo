import { Cell, Slice, Builder, beginCell, TupleBuilder, TupleReader, Address } from '@ton/core';

import { ContractSystem, Treasure } from "@tact-lang/emulator";
import {   
    storeStateInit, 
    loadStateInit, 
    StateInit, 
    did, 
    storeContext,
    loadContext,
    Context
 }  from "../src/output/rns_did";



 describe('StateInit serialization and deserialization', () => {

    it('should store Context correctly', async () => {

        let  system = await ContractSystem.create();
        let owner = system.treasure("owner");
        
        // 创建一个 Context 对象
        const context: Context = {
            $$type: 'Context',
            bounced: true,
            sender: owner.address,
            value: 1000n,
            raw: beginCell().storeUint(1, 32).endCell()
        };

        // 创建一个 Builder 对象
        const builder = new Builder();

        // 调用 storeContext 函数
        storeContext(context)(builder);


        // 获取生成的 Cell
        const cell = builder.endCell();

        // 解析 Cell 并验证内容
        const slice = cell.beginParse();
       

        let _stored = loadContext(slice)

        const storedBounced = _stored.bounced;
        const storedSender = _stored.sender;
        const storedValue = _stored.value;
        const storedRaw = _stored.raw;

        expect(storedBounced).toBe(context.bounced);
        expect(storedSender.equals(context.sender)).toBe(true);
        expect(storedValue).toBe(context.value);
        expect(storedRaw.equals(context.raw)).toBe(true);
    });
    it('should store and load StateInit correctly', () => {
        // Create a StateInit object
        const codeCell = beginCell().storeUint(1, 32).endCell();
        const dataCell = beginCell().storeUint(2, 32).endCell();
        const stateInit: StateInit = { $$type: 'StateInit', code: codeCell, data: dataCell };

        // Store StateInit
        const builder = new Builder();
        storeStateInit(stateInit)(builder);
        const cell = builder.endCell();

        // Load StateInit
        const slice = cell.beginParse();
        const loadedStateInit = loadStateInit(slice);

        // Verify the loaded StateInit
        expect(loadedStateInit.code.equals(stateInit.code)).toBe(true);
        expect(loadedStateInit.data.equals(stateInit.data)).toBe(true);
    });

});