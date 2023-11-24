import assert from 'assert';
import { addData, deleteData, getData } from './data.service';
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should get data successfully', function () {
      const data = getData();
      assert.ok(data.length > 0);
    });
    it('should add data successfully', function () {
      const row = { name: 'test', email: 'email', avatar: 'avatar' };
      addData(row);
      const data = getData();
      assert.equal(data.find((item) => item.name === row.name)?.name, row.name);
    });
    it('should delete a row in data successfully', function () {
      const row = { name: 'test-delete', email: 'email', avatar: 'avatar' };
      addData(row);
      const data = getData();
      const id = data.find((item) => item.name === row.name)?.id;
      if (id) {
        deleteData(id);
      }
      const newData = getData();
      assert.ok(!newData.find((item) => item.name === row.name));
    });
  });
});
