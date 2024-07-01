import { Builder, Slice, Address, beginCell } from '@ton/core';
import { storeFactoryDeploy, loadFactoryDeploy, FactoryDeploy, storeDeploy, loadDeploy, storeDeployOk, loadDeployOk, Deploy, DeployOk } from '../src/output/rns_did';
import { ContractSystem } from '@tact-lang/emulator';


describe('FactoryDeploy serialization and deserialization', () => {
    it('should store and load FactoryDeploy correctly', async () => {

        let  system = await ContractSystem.create();
        let owner = system.treasure("owner");
        
        
        // 创建一个 FactoryDeploy 对象
        const factoryDeploy: FactoryDeploy = {
            $$type: 'FactoryDeploy',
            queryId: 12345n,
            cashback: owner.address,
        };

        // 创建一个 Builder 对象
        const builder = new Builder();

        // 调用 storeFactoryDeploy 函数
        storeFactoryDeploy(factoryDeploy)(builder);

        // 获取生成的 Cell
        const cell = builder.endCell();

        // 解析 Cell 并验证内容
        const slice = cell.beginParse();
        const loadedFactoryDeploy = loadFactoryDeploy(slice);

        expect(loadedFactoryDeploy.$$type).toBe('FactoryDeploy');
        expect(loadedFactoryDeploy.queryId).toBe(factoryDeploy.queryId);
        expect(loadedFactoryDeploy.cashback.equals(factoryDeploy.cashback)).toBe(true);
    });

    it('should throw error on invalid prefix in loadFactoryDeploy', async () => {

        let  system = await ContractSystem.create();
        let owner = system.treasure("owner");
        
        
        // 创建一个错误的 Cell
        const builder = new Builder();
        builder.storeUint(1234567890, 32); // 使用错误的前缀
        builder.storeUint(12345n, 64);
        builder.storeAddress(owner.address);
        const cell = builder.endCell();

        // 解析 Cell 并验证错误抛出
        const slice = cell.beginParse();
        expect(() => loadFactoryDeploy(slice)).toThrow('Invalid prefix');
    });
});
