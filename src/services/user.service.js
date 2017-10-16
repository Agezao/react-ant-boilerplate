import HttpHandler from './handlers/http.handler';
import LocalHandler from './handlers/local.handler';

const get = (id) => {
	let route = !id ? '/users' : '/users/' + id;

	return HttpHandler.request(route, 'GET', null);
}

const local = () => {
	if(localStorage.user)
		return JSON.parse(localStorage.user);
	return null;
}

const save = (model) => {
	return HttpHandler.request('/users', 'PUT', model);
}

export default { get, save, local };