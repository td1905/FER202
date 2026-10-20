export const COURSES = [
  { code: 'PRF192', name: 'Programming Fundamentals', credits: 3, semester: 1, desc: 'Nhập môn lập trình căn bản với C.' },
  { code: 'PRO192', name: 'Object-Oriented Programming', credits: 3, semester: 2, desc: 'Lập trình hướng đối tượng với Java.' },
  { code: 'WED201c', name: 'Web Design', credits: 3, semester: 2, desc: 'Thiết kế giao diện website chuẩn HTML, CSS, JavaScript.' },
  { code: 'FER202', name: 'Front-End Web Development', credits: 3, semester: 3, desc: 'Phát triển ứng dụng Web SPA với ReactJS.' },
  { code: 'SWP391', name: 'Application Development Project', credits: 3, semester: 5, desc: 'Dự án thực tế làm việc theo nhóm phát triển phần mềm.' },
];

export const findCourse = (code) => {
  if (!code) return null;
  return COURSES.find((c) => c.code.toLowerCase() === code.trim().toLowerCase()) ?? null;
};