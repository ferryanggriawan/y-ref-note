import localforage from "localforage"

export const useDB = async () => {
	const db = localforage.createInstance({
		driver: localforage.INDEXEDDB,
		name: "webdb_yrefapp",
		storeName: "notes",
	})

	return {
		...db,
		apps: localforage,
		notes: db,
	}
}
