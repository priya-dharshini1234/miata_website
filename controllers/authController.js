const User = require('../models/user');

// ===============================
// STUDENT LOGIN
// ===============================
exports.getStudentLogin = (req, res) => res.render('login_student');

exports.postStudentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'student' });
    if (!user) return res.render('login_student', { error: 'Invalid credentials or not a student account' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render('login_student', { error: 'Invalid username or password' });
    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.redirect('/dashboard/student');
  } catch (err) {
    res.render('login_student', { error: 'Something went wrong' });
  }
};

// ===============================
// AGENT LOGIN
// ===============================
exports.getAgentLogin = (req, res) => res.render('login_agent');

exports.postAgentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'agent' });
    if (!user) return res.render('login_agent', { error: 'Invalid credentials or not an agent account' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render('login_agent', { error: 'Invalid username or password' });
    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.redirect('/dashboard/agent');
  } catch (err) {
    res.render('login_agent', { error: 'Something went wrong' });
  }
};

// ===============================
// PROFESSOR LOGIN
// ===============================
exports.getProfessorLogin = (req, res) => res.render('login_professor');

exports.postProfessorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'professor' });
    if (!user) return res.render('login_professor', { error: 'Invalid credentials or not a professor account' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render('login_professor', { error: 'Invalid username or password' });
    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.redirect('/dashboard/professor');
  } catch (err) {
    res.render('login_professor', { error: 'Something went wrong' });
  }
};

// ===============================
// SIGNUP
// ===============================
exports.getSignup = (req, res) => res.render('signup');

exports.postSignup = async (req, res) => {
  try {
    const { username, password1, password2, role, email } = req.body;
    if (password1 !== password2) return res.render('signup', { error: 'Passwords do not match' });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.render('signup', { error: 'Username already exists' });
    const user = await User.create({
      username,
      email: email || username + '@miata.com',
      password: password1,
      role: role || 'student'
    });
    req.session.user = { id: user._id, username: user.username, role: user.role };
    if (user.role === 'agent') return res.redirect('/dashboard/agent');
    if (user.role === 'professor') return res.redirect('/dashboard/professor');
    res.redirect('/dashboard/student');
  } catch (err) {
    res.render('signup', { error: 'Something went wrong' });
  }
};

// ===============================
// LOGOUT
// ===============================
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};