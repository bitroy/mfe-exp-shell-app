async function resolveRemoteUrl(remoteName) {
	if (window.REMOTE_TODO_APP_URL) {
		return window.REMOTE_TODO_APP_URL;
	}

	try {
		const manifest = await fetch("/remoteManifest.json", {
			cache: "no-store",
		}).then((r) => r.json());
		const url = manifest?.[remoteName]?.url;
		if (url) return url;
	} catch {}

	throw new Error(`No URL found for remote ${remoteName}`);
}

export default resolveRemoteUrl;
