import HttpHandler from './handlers/http.handler';

const signup = (model) => {
	return HttpHandler.request('/signup', 'POST', model);
}

const login = (model) => {
	return HttpHandler.request('/login', 'POST', model);
}

const recovery = (model) => {
	return HttpHandler.request('/password/recovery', 'POST', model);
}

const updatePassword = (model) => {
	return HttpHandler.request('/password/update', 'POST', model);
}
export default { login, signup, recovery, updatePassword };