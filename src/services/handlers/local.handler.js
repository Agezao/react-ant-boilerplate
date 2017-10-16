import Dexie from 'dexie';

//defining local db
const localdb = new Dexie("AntBoilerplate");
localdb.version(1).stores({
	users: "_id,name,username,email,about,created"
});

//privete
const generateId = () => {
	return  "temp_" + new Date().getTime();
}

const generateApiResponse = (data) => {
	return {
		success: true,
		code: null,
		message: null,
		data: data
	};
};

// public
let save = (collection, vm) => {
	if(!vm._id) {
		vm._id = generateId();
	}

	return localdb[collection].put(vm)
		.then(response => {
			return generateApiResponse(response);
		});;
}

let fetch = (collection, vm) => {
	//if not an object, then it's the key
	if(typeof(vm) !== 'object')
		vm = {'_id': vm};

	return localdb[collection].where(vm).toArray()
		.then(response => {
			return generateApiResponse(response);
		});
}

let fetchTemp = (collection) => {
	return localdb[collection].where("_id").startsWith("temp_").toArray()
		.then(response => {
			return generateApiResponse(response);
		});
};

let remove = (collection, id) => {
	return localdb[collection].delete(id)
		.then(response => {
			return generateApiResponse(response);
		});
}

export default { save, fetch, fetchTemp, remove };