import * as assert from "assert";
import * as httpMocks from "node-mocks-http";
import { saveFile, loadFile, listFiles, resetSavesForTesting, deleteFile } from "./routes";

describe("routes", function () {

  // Exhaustive Testing, Statement Coverage, Branch Coverage
  it("saveFile", function () {
    // Valid save
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file1", content: { key: "{\"name\":\"test1\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } },
    });
    const res1 = httpMocks.createResponse();
    saveFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { message: "File saved successfully" });

    // Missing name
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { content: { key: "value" } },
    });
    const res2 = httpMocks.createResponse();
    saveFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.strictEqual(res2._getData(), "Request body must contain name and content fields");

    // Invalid name
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: 123, content: { key: "{\"name\":\"test1\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } },
    });
    const res3 = httpMocks.createResponse();
    saveFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.strictEqual(res3._getData(), "Name must be a string");

    // Missing content
    const req4 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file2" },
    });
    const res4 = httpMocks.createResponse();
    saveFile(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.strictEqual(res4._getData(), "Request body must contain name and content fields");

    // Invalid content
    const req5 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file3", content: () => console.log("test") },
    });
    const res5 = httpMocks.createResponse();
    saveFile(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), { error: "Content must be JSON-serializable" });

    resetSavesForTesting();
  });

  // Exhaustive Testing, Statement Coverage, Branch Coverage
  it("loadFile", function () {
    // Save a file to load
    const saveReq = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file1", content: { key: "{\"name\":\"test\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } },
    });
    const saveRes = httpMocks.createResponse();
    saveFile(saveReq, saveRes);

    // Valid load
    const req1 = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
      query: { name: "file1" },
    });
    const res1 = httpMocks.createResponse();
    loadFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { name: "file1", content: { key: "{\"name\":\"test\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } });

    // Missing name
    const req2 = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
    });
    const res2 = httpMocks.createResponse();
    loadFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.strictEqual(res2._getData(), 'Missing "name" parameter');

    // File not found
    const req3 = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
      query: { name: "nonexistent" },
    });
    const res3 = httpMocks.createResponse();
    loadFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 404);
    assert.deepStrictEqual(res3._getData(), { error: 'File "nonexistent" not found' });

    resetSavesForTesting();
  });

  // At least two tests, Statement Coverage, Branch Coverage
  it("listFiles", function () {
    // No files saved
    const req1 = httpMocks.createRequest({
      method: "GET",
      url: "/api/list",
    });
    const res1 = httpMocks.createResponse();
    listFiles(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { files: [] });

    // Save multiple files
    const saveReq1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file1", content: { key: "{\"name\":\"test\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } },
    });
    const saveReq2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file2", content: { key: "{\"name\":\"test2\",\"content\":{\"kind\":\"split\",\"nw\":{\"kind\":\"solid\",\"color\":\"white\"},\"ne\":{\"kind\":\"solid\",\"color\":\"white\"},\"sw\":{\"kind\":\"solid\",\"color\":\"orange\"},\"se\":{\"kind\":\"solid\",\"color\":\"white\"}}}" } },
    });
    saveFile(saveReq1, httpMocks.createResponse());
    saveFile(saveReq2, httpMocks.createResponse());

    // List files
    const req2 = httpMocks.createRequest({
      method: "GET",
      url: "/api/list",
    });
    const res2 = httpMocks.createResponse();
    listFiles(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), { files: ["file1", "file2"] });

    resetSavesForTesting();
  });

  // Exhaustive Testing, Statement Coverage, Branch Coverage
  it("deleteFile", function () {
    // Save files for deletion testing
    const saveReq = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "file1", content: { key: "{\"name\":\"test\",\"content\":{\"kind\":\"solid\",\"color\":\"white\"}}" } },
    });
    saveFile(saveReq, httpMocks.createResponse());

    // Test valid deletion
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/delete",
      body: { name: "file1" }
    });
    const res1 = httpMocks.createResponse();
    deleteFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { message: 'File "file1" deleted' });

    // Test missing body
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/delete"
    });
    const res2 = httpMocks.createResponse();
    deleteFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.strictEqual(res2._getData(), 'Request body must contain name field');

    // Test missing name in body
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/delete",
      body: { other: "value" }
    });
    const res3 = httpMocks.createResponse();
    deleteFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.strictEqual(res3._getData(), 'Request body must contain name field');

    // Test invalid name type (number instead of string)
    const req4 = httpMocks.createRequest({
      method: "POST",
      url: "/api/delete",
      body: { name: 123 }
    });
    const res4 = httpMocks.createResponse();
    deleteFile(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.strictEqual(res4._getData(), 'Name must be a string');

    // Test file not found
    const req5 = httpMocks.createRequest({
      method: "POST",
      url: "/api/delete",
      body: { name: "nonexistent" }
    });
    const res5 = httpMocks.createResponse();
    deleteFile(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 404);
    assert.deepStrictEqual(res5._getData(), { error: 'File "nonexistent" not found' });

    // Verify deletion by checking list is empty
    const listReq = httpMocks.createRequest({
      method: "GET",
      url: "/api/list"
    });
    const listRes = httpMocks.createResponse();
    listFiles(listReq, listRes);
    assert.deepStrictEqual(listRes._getData(), { files: [] });

    resetSavesForTesting();
  });
});
