// utils/auth.ts
export function getCurrentUserId(): string | null {
  const userInfo = uni.getStorageSync('userInfo')
  return userInfo ? userInfo.id : null
}
