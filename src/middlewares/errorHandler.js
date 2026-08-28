// 我們建立一個輔助函式，方便在 controller 裡快速丟出帶有 status code 的錯誤。
// 這個函式本身不是 middleware，但它是 middleware 生態系的一部分，
// 因為它產生的錯誤最終會被下面的 errorHandler 接住。
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// 這是處理「找不到路由」的 middleware。
// 它沒有放在任何 app.get/post 裡，而是放在所有路由「之後」，
// 代表：如果請求走到這裡，表示前面沒有任何路由匹配成功。
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} wurde nicht gefunden.`,
  });
}

// 這是「錯誤處理 middleware」，注意它有 4 個參數 (err, req, res, next)。
// Express 是透過「參數數量是 4 個」來判斷這是一個錯誤處理 middleware，
// 只要你呼叫 next(someError)，就會跳過所有一般 middleware，直接跳到這裡執行。
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    status,
    error: err.message || "Internal Server Error",
  });
}
