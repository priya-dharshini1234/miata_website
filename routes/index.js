const express = require('express');
const router = express.Router();
const views = require('../controllers/viewsController');
const auth = require('../controllers/authController');
const { isAuthenticated, isRole } = require('../middleware/auth');

// HOME
router.get('/', views.index);

// MAIN PAGES
router.get('/study', views.study);
router.get('/student-services', views.student_services);
router.get('/research', views.research);
router.get('/faculties', views.faculties);
router.get('/about', views.about);
router.get('/subjects', views.subjects);
router.get('/courses', views.courses);
router.get('/apply', views.apply);
router.get('/fees', views.fees);
router.get('/international', views.international);
router.get('/experience', views.experience);
router.get('/events', views.events);
router.get('/offer-holders', views.offerHolders);
router.get('/contact', views.contact);

// STUDENT LOGIN
router.get('/login/student', auth.getStudentLogin);
router.post('/login/student', auth.postStudentLogin);

// AGENT LOGIN
router.get('/login/agent', auth.getAgentLogin);
router.post('/login/agent', auth.postAgentLogin);

// PROFESSOR LOGIN
router.get('/login/professor', auth.getProfessorLogin);
router.post('/login/professor', auth.postProfessorLogin);

// SIGNUP & LOGOUT
router.get('/signup', auth.getSignup);
router.post('/signup', auth.postSignup);
router.get('/logout', auth.logout);

// PROTECTED DASHBOARDS
router.get('/dashboard/student', isAuthenticated, isRole('student'), views.studentDashboard);
router.get('/dashboard/agent', isAuthenticated, isRole('agent'), views.agentDashboard);
router.get('/dashboard/professor', isAuthenticated, isRole('professor'), views.professorDashboard);

// PROTECTED COURSE PAGES
router.get('/chap1', isAuthenticated, views.chap1);
router.get('/ass1', isAuthenticated, views.ass1);
router.post('/ass1', isAuthenticated, views.ass1);
router.get('/result', isAuthenticated, views.result);
router.get('/login', (req, res) => res.render('login'));

module.exports = router;