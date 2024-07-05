import { AuthService } from '../auth.service';

export function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function setVerificationCode(
  email: string,
  code: string,
  map: Map<string, { code: string; timer: NodeJS.Timeout; userId: number }>,
  duration: number,
  userId: number,
  authService: AuthService,
) {
  const existing = map.get(email);
  if (existing) {
    clearTimeout(existing.timer);
  }
  const timer = setTimeout(async () => {
    // await authService.deleteUnverifiedUser(userId, email);
  }, duration);

  map.set(email, { code, timer, userId });
}
