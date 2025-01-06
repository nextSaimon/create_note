export async function cookieCheck(req) {
  const cookie = req.cookies.get("__user__");
  console.log("Cookies:Checking cookie");
  if (!cookie) {
    return false; // No user cookie found, unauthorized
  }
  return true; // Valid cookie
}
