import {
	loadRemote,
	registerRemotes,
} from "@module-federation/enhanced/runtime";
import { useEffect, useState } from "react";
import resolveRemoteUrl from "../utils/resolveRemoteURL";

export function useRemoteComponent(remoteName, moduleName) {
	const [Component, setComponent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function getRemoteComponent() {
			try {
				const remoteUrl = await resolveRemoteUrl(remoteName);

				registerRemotes([{ name: remoteName, entry: remoteUrl }]);

				const Mod = await loadRemote(`${remoteName}/${moduleName}`, {
					from: remoteUrl,
				});

				const Comp = Mod?.default || Mod;

				if (mounted) setComponent(() => Comp);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		getRemoteComponent();
		return () => {
			mounted = false;
		};
	}, [remoteName, moduleName]);

	return { Component, loading, error };
}
