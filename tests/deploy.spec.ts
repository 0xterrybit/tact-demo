import { Builder, Slice, Cell, beginCell } from '@ton/core';
import { storeDeploy, loadDeploy, storeDeployOk, loadDeployOk, Deploy, DeployOk } from '../src/output/rns_did';

describe('Deploy serialization and deserialization', () => {
    it('should store and load Deploy correctly', () => {
        // 创建一个 Deploy 对象
        const deploy: Deploy = {
            $$type: 'Deploy',
            queryId: 12345n
        };

        // 创建一个 Builder 对象
        const builder = new Builder();

        // 调用 storeDeploy 函数
        storeDeploy(deploy)(builder);

        // 获取生成的 Cell
        const cell = builder.endCell();

        // 解析 Cell 并验证内容
        const slice = cell.beginParse();
        const loadedDeploy = loadDeploy(slice);

        expect(loadedDeploy.$$type).toBe('Deploy');
        expect(loadedDeploy.queryId).toBe(deploy.queryId);
    });

    it('should throw error on invalid prefix in loadDeploy', () => {
        // 创建一个错误的 Cell
        const builder = new Builder();
        builder.storeUint(1234567890, 32); // 使用错误的前缀
        builder.storeUint(12345n, 64);
        const cell = builder.endCell();

        // 解析 Cell 并验证错误抛出
        const slice = cell.beginParse();
        expect(() => loadDeploy(slice)).toThrow('Invalid prefix');
    });
});

describe('DeployOk serialization and deserialization', () => {
    it('should store and load DeployOk correctly', () => {
        // 创建一个 DeployOk 对象
        const deployOk: DeployOk = {
            $$type: 'DeployOk',
            queryId: 67890n
        };

        // 创建一个 Builder 对象
        const builder = new Builder();

        // 调用 storeDeployOk 函数
        storeDeployOk(deployOk)(builder);

        // 获取生成的 Cell
        const cell = builder.endCell();

        // 解析 Cell 并验证内容
        const slice = cell.beginParse();
        const loadedDeployOk = loadDeployOk(slice);

        expect(loadedDeployOk.$$type).toBe('DeployOk');
        expect(loadedDeployOk.queryId).toBe(deployOk.queryId);
    });

    it('should throw error on invalid prefix in loadDeployOk', () => {
        // 创建一个错误的 Cell
        const builder = new Builder();
        builder.storeUint(1234567890, 32); // 使用错误的前缀
        builder.storeUint(67890n, 64);
        const cell = builder.endCell();

        // 解析 Cell 并验证错误抛出
        const slice = cell.beginParse();
        expect(() => loadDeployOk(slice)).toThrow('Invalid prefix');
    });
});
