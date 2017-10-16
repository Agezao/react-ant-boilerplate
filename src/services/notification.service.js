import Alert from 'react-s-alert';

const success = (title, message) => {
	Alert.success(title);
}

const info = (title, message) => {
	Alert.info(title);
}

const warning = (title, message) => {
	Alert.warning(title);
}

const error = (title, message) => {
	Alert.error(title);
}


export default { success, info, warning, error };