const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function dateFromObjectId(objectId) {
  const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  const formatDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
	return formatDate;
}
