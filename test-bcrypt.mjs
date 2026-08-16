import bcrypt from 'bcryptjs';

const hash = '$2a$10$WqB4I/L1l92j2Z4sV2wDgeA1wK2k4x/lQ/x4F8V6gQ3mXQ2B2Qp1K';
const password = 'FaresEEE';

async function test() {
  const isValid = await bcrypt.compare(password, hash);
  console.log('IsValid:', isValid);
}
test();
