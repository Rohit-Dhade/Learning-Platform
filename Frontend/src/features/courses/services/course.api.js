import {api} from '../../auth/services/auth.api'

export async function all_courses() {
  const response = await api.get("/api/course/all-courses");
  return response.data.courses;
}

export async function get_course(id) {
  const response = await api.get(`/api/course/get-course/${id}`);
  return response.data.course;
}
