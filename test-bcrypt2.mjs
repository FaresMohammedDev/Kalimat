import bcrypt from 'bcryptjs';
async function test() {
  const hash = await bcrypt.hash('FaresEEE', 10);
  console.log('Correct Hash:', hash);
}
test();
