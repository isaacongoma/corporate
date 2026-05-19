import prisma from '@/lib/prisma';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const s = await prisma.setting.findFirst({ select: { logo: true } }).catch(() => null);
  return <LoginForm logo={s?.logo || null} />;
}
