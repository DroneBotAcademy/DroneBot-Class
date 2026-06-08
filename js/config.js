const scriptURL = "https://script.google.com/macros/s/AKfycbxTUXQyfcacNjPY4AcbU22_ccmhFDEcGpQtVOu4L6CXqa5CMy9XECweaGdvAnniUSoO/exec";
const scriptURLBKK = "https://script.google.com/macros/s/AKfycbwu-sOPhox_aoQh5nKfRapmjiZFDZ5ShAhw51dXwiBjzf302rDK5KKnabGM2n_jZFzZlA/exec";
const authScriptURL = scriptURL;
const API_URL = scriptURL;

// ✅ Override scriptURL ตาม branch — ไม่ต้องแก้ไฟล์อื่นเลย
(function() {
  const branch = localStorage.getItem('branch') || 'hdy';
  if (branch === 'bkk') {
    window.scriptURL = scriptURLBKK;
  }
})();
