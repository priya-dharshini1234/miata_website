const User = require('../models/user');

// MAIN PAGES
exports.index = (req, res) => res.render('index');
exports.study = (req, res) => res.render('study');
exports.student_services = (req, res) => res.render('student_services');
exports.research = (req, res) => res.render('research');
exports.faculties = (req, res) => res.render('faculties');
exports.about = (req, res) => res.render('about');
exports.subjects = (req, res) => res.render('subjects');
exports.courses = (req, res) => res.render('courses');
exports.apply = (req, res) => res.render('apply');
exports.fees = (req, res) => res.render('fees');
exports.international = (req, res) => res.render('international');
exports.experience = (req, res) => res.render('experience');
exports.events = (req, res) => res.render('events');
exports.offerHolders = (req, res) => res.render('offer_holders');
exports.contact = (req, res) => res.render('contact');

// DASHBOARDS
exports.studentDashboard = (req, res) => {
  res.render('dashboard_student', { user: req.session.user });
};

exports.agentDashboard = (req, res) => {
  res.render('dashboard_agent', { user: req.session.user });
};

exports.professorDashboard = (req, res) => {
  res.render('dashboard_professor', { user: req.session.user });
};

// CHAPTER & ASSESSMENT
exports.chap1 = (req, res) => {
  res.render('chap1', { coursework_start_time: null });
};

const correctAnswers = { q1: 'c', q2: 'b' };

exports.ass1 = (req, res) => {
  if (req.method === 'POST') {
    let score = 0;
    const total = Object.keys(correctAnswers).length;
    for (const [q, ans] of Object.entries(correctAnswers)) {
      if (req.body[q] === ans) score++;
    }
    req.session.quiz_score = score;
    req.session.quiz_total = total;
    return res.redirect('/result');
  }
  res.render('ass1');
};

exports.result = (req, res) => {
  const score = req.session.quiz_score;
  const total = req.session.quiz_total;
  if (score === undefined) return res.redirect('/ass1');
  const percentage = Math.round((score / total) * 100);
  res.render('result', { score, total, percentage });
};