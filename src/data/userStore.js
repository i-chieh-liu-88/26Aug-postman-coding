// 我們把「資料本身」抽出來，讓 controller 可以直接 import 使用。
export let users = [
  { id: 1, name: "Ada", email: "ada@example.com" },
  { id: 2, name: "Linus", email: "linus@example.com" },
];

export let nextId = 3;

// 因為 nextId 是 primitive number，export 出去後在別的檔案 ++ 不會影響到這裡，
// 所以我們用一個函式來包裝「取得下一個 id 並遞增」的行為。
export function getNextId() {
  return nextId++;
}
