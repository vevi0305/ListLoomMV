/* eslint-disable no-unsafe-finally */
const Apirequest = async (url = "", optObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optObj);
    if (!response.ok) throw Error("Please Reload the App...");
  } catch (err) {
    errMsg = err.Message;
  } finally {
    return errMsg;
  }
};
export default Apirequest;
