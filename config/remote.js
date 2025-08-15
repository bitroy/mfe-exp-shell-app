function getRemotes(isDev) {
	return {
		todoApp: isDev
			? `todoApp@${process.env.REMOTE_TODO_APP_URL}`
			: `promise new Promise((resolve, reject) => {
            const url = window.REMOTE_TODO_APP_URL;
            if (!url) return reject(new Error('REMOTE_TODO_APP_URL is missing'));

            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
              const proxy = {
                get: (request) => window.todoApp.get(request),
                init: (arg) => {
                  try { return window.todoApp.init(arg); } catch (e) {}
                }
              };
              resolve(proxy);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        })`,
	};
}

module.exports = { getRemotes };
