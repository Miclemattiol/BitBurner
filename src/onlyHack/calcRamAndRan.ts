import { NS } from '@ns';

const onlyGrowScript = 'onlyHack/onlyGrow.js';
const onlyWeakenScript = 'onlyHack/onlyWeaken.js';
const onlyHackScript = 'onlyHack/onlyHack.js';

export const main = async (ns: NS) => {
	const server = ns.args[0] as string;
	const host = ns.args[1] as string;
	if (!server || !host) return;
	const ram = ns.getServerMaxRam(server) / 3;
	const growRam = ns.getScriptRam(onlyGrowScript);
	const weakenRam = ns.getScriptRam(onlyWeakenScript);
	const hackRam = ns.getScriptRam(onlyHackScript);
	const growThreads = Math.floor(ram / growRam);
	const weakenThreads = Math.floor(ram / weakenRam);
	const hackThreads = Math.floor(ram / hackRam);
	ns.scp(onlyHackScript, server);
	ns.scp(onlyWeakenScript, server);
	ns.scp(onlyGrowScript, server);
	ns.exec(
		onlyHackScript,
		server,
		{ threads: hackThreads },
		host,
		hackThreads,
	);
	ns.exec(
		onlyWeakenScript,
		server,
		{ threads: weakenThreads },
		host,
		weakenThreads,
	);
	ns.exec(
		onlyGrowScript,
		server,
		{ threads: growThreads },
		host,
		growThreads,
	);
};
