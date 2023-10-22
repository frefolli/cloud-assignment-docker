import "@testing-library/jest-dom/extend-expect";
import { FAKE_NOTIFIER } from "../src/utils/Protocol";

const notifier = FAKE_NOTIFIER;

describe("Notifier.js", () => {
  test("Notifier do launch messages", async () => {
    notifier.success("success");
    notifier.error("error");
    notifier.warning("warning");
  })

  test("Notifier onRequestErrorResolvePromise", async () => {
    let rule = notifier.onRequestErrorResolvePromise(() => {}, () => {}, () => {});
    rule({status:200});
    rule({status:400});
  })

  test("Notifier onRequestSuccessResolvePromise", async () => {
    let rule = notifier.onRequestSuccessResolvePromise(() => {}, () => {}, () => {});
    rule({status:200});
    rule({status:400});
  })
  
  test("Notifier onRequestError", async () => {
    let rule = notifier.onRequestError(() => {});
    rule({status:200});
    rule({status:400});
  })
  
  test("Notifier onRequestSuccess", async () => {
    let rule = notifier.onRequestSuccess(() => {});
    rule({status:200});
    rule({status:400});
  })
  
  test("Notifier connectionError", async () => {
    notifier.connectionError();
  })
})
