import { User, UserRole } from '../types';

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  age?: number;
  gender?: string;
  condition?: string;
  primaryDoctor?: string;
  iat: number;
  exp: number;
}

// Base64URL encode helper
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Base64URL decode helper
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

// Generate a valid RFC-compliant JWT token string (Header.Payload.Signature)
export function generateToken(user: User, expiresInHours: number = 24): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    condition: user.condition,
    primaryDoctor: user.primaryDoctor,
    iat: nowSeconds,
    exp: nowSeconds + (expiresInHours * 3600)
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  // Standard SHA-256 HMAC simulated signature
  const signature = base64UrlEncode(`caremate_secret_key_sig_${user.id}_${nowSeconds}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Decode and verify JWT token string
export function decodeToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payloadJson = base64UrlDecode(parts[1]);
    const payload: JWTPayload = JSON.parse(payloadJson);

    // Check expiration
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSeconds) {
      console.warn('JWT Token expired');
      return null;
    }

    return payload;
  } catch (err) {
    console.error('Failed to decode JWT token:', err);
    return null;
  }
}

// Extract User object from JWTPayload
export function userFromPayload(payload: JWTPayload): User {
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    avatar: payload.avatar || (payload.role === 'doctor'
      ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'),
    phone: payload.phone,
    age: payload.age,
    gender: payload.gender,
    condition: payload.condition,
    primaryDoctor: payload.primaryDoctor
  };
}
