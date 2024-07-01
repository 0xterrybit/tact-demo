import { Builder, Slice, beginCell } from '@ton/core';
import { loadAdd, Add } from '../src/output/rns_did';

describe('loadAdd', () => {
    it('should load Add correctly', () => {
        // 创建一个包含有效前缀和 amount 的 Cell
        const builder = new Builder();
        builder.storeUint(2278832834, 32); // 有效的前缀
        builder.storeUint(12345n, 32); // amount
        const cell = builder.endCell();

        // 解析 Cell 并验证内容
        const slice = cell.beginParse();
        const loadedAdd = loadAdd(slice);

        expect(loadedAdd.$$type).toBe('Add');
        expect(loadedAdd.amount).toBe(12345n);
    });

    it('should throw error on invalid prefix', () => {
        // 创建一个包含无效前缀的 Cell
        const builder = new Builder();
        builder.storeUint(1234567890, 32); // 无效的前缀
        builder.storeUint(12345n, 32); // amount
        const cell = builder.endCell();

        // 解析 Cell 并验证错误抛出
        const slice = cell.beginParse();
        expect(() => loadAdd(slice)).toThrow('Invalid prefix');
    });
});
